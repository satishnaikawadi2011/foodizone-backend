import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

import * as Joi from 'joi';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './jwt/middlewares/jwt-middleware';
import { MailModule } from './mail/mail.module';
import { Verification } from './users/entities/verification.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Category } from './restaurants/entities/category.entity';
import { Dish } from './restaurants/entities/dish.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/entities/payment.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadsModule } from './uploads/uploads.module';

@Module({
	imports:
		[
			ConfigModule.forRoot({
				isGlobal: true,
				envFilePath:

						process.env.NODE_ENV === 'dev' ? '.env.dev' :
						'.env.test',
				ignoreEnvFile: process.env.NODE_ENV === 'prod',
				validationSchema:
					Joi.object({
						NODE_ENV: Joi.string().valid('dev', 'prod').required(),
						DB_HOST: Joi.string().required(),
						DB_PORT: Joi.string().required(),
						DB_USERNAME: Joi.string().required(),
						DB_PASSWORD: Joi.string().required(),
						DB_NAME: Joi.string().required(),
						SECRET_KEY: Joi.string().required(),
						SENDGRID_FROM_EMAIL: Joi.string().required(),
						SENDGRID_API_KEY: Joi.string().required(),
						CLOUDINARY_API_KEY: Joi.string().required(),
						CLOUDINARY_API_SECRET: Joi.string().required(),
						CLOUDINARY_CLOUD_NAME: Joi.string().required(),
						STRIPE_SECRET_TEST_KEY: Joi.string().required(),
						FRONTEND_BASE_URL: Joi.string().required()
					})
			}),
			TypeOrmModule.forRoot({
				type: 'postgres',
				host: process.env.DB_HOST,
				port: +process.env.DB_PORT,
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				logging: process.env.NODE_ENV !== 'prod',
				synchronize: process.env.NODE_ENV !== 'prod',
				entities:
					[
						User,
						Verification,
						Restaurant,
						Category,
						Dish,
						Order,
						OrderItem,
						Payment
					]
			}),

			ScheduleModule.forRoot(),
			JwtModule.forRoot({
				privateKey: process.env.SECRET_KEY
			}),
			GraphQLModule.forRoot({
				installSubscriptionHandlers: true,
				subscriptions:
					{
						'subscriptions-transport-ws':
							{
								onConnect:
									(connectionParams) => {
										return { token: connectionParams['auth-token'] };
									}
							}
					},
				autoSchemaFile: true,
				context:
					({ req, connection }) => {
						const TOKEN_KEY = 'auth-token';
						return {
							token:

									req ? req.headers[TOKEN_KEY] :
									connection[TOKEN_KEY]
						};
					}
			}),
			MailModule.forRoot({
				apiKey: process.env.SENDGRID_API_KEY,
				fromEmail: process.env.SENDGRID_FROM_EMAIL
			}),
			PaymentsModule.forRoot({
				secretKey: process.env.STRIPE_SECRET_TEST_KEY
			}),
			UsersModule,
			CommonModule,
			AuthModule,
			RestaurantsModule,
			OrdersModule,
			UploadsModule
		],
	controllers:
		[
			AppController
		],
	providers:
		[
			AppService
		]
})
export class AppModule {}

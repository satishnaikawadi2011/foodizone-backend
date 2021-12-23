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
						SECRET_KEY: Joi.string().required()
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
						User
					]
			}),
			JwtModule.forRoot({
				privateKey: process.env.SECRET_KEY
			}),
			GraphQLModule.forRoot({
				autoSchemaFile: true,
				context: ({ req }) => ({ user: req['user'] })
			}),
			UsersModule,
			CommonModule,
			AuthModule
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
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes({
			path: '/graphql',
			method: RequestMethod.ALL
		});
	}
}

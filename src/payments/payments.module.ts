import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payments.resolver';
import { PaymentService } from './payments.service';
import { PaymentModuleOptions } from './interfaces';
import { PAYMENT_CONFIG_OPTIONS } from './constants';
@Module({})
@Global()
export class PaymentsModule {
	static forRoot(options: PaymentModuleOptions): DynamicModule {
		return {
			module: PaymentsModule,
			imports:
				[
					TypeOrmModule.forFeature([
						Payment,
						Restaurant
					])
				],
			exports:
				[
					PaymentService
				],
			providers:
				[
					{
						provide: PAYMENT_CONFIG_OPTIONS,
						useValue: options
					},
					PaymentService,
					PaymentResolver
				]
		};
	}
}

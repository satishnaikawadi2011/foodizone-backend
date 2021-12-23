import { DynamicModule, Global, Module } from '@nestjs/common';
import { MAIL_CONFIG_OPTIONS } from './constants';
import { MailModuleOptions } from './interfaces';
import { MailService } from './mail.service';

@Module({})
@Global()
export class MailModule {
	static forRoot(options: MailModuleOptions): DynamicModule {
		return {
			module: MailModule,
			exports:
				[
					MailService
				],
			providers:
				[
					{
						provide: MAIL_CONFIG_OPTIONS,
						useValue: options
					},
					MailService
				]
		};
	}
}

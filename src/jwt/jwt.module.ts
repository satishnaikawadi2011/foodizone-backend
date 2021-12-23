import { DynamicModule, Global, Module } from '@nestjs/common';
import { JWT_CONFIG_OPTIONS } from './constants';
import { JwtModuleOptions } from './interfaces/jwt-module-options';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
	static forRoot(options: JwtModuleOptions): DynamicModule {
		return {
			module: JwtModule,
			exports:
				[
					JwtService
				],
			providers:
				[
					{
						provide: JWT_CONFIG_OPTIONS,
						useValue: options
					},
					JwtService
				]
		};
	}
}

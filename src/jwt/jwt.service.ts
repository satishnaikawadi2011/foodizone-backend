import { Inject, Injectable } from '@nestjs/common';
import { JWT_CONFIG_OPTIONS } from './constants';
import { JwtModuleOptions } from './interfaces/jwt-module-options';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
	constructor(@Inject(JWT_CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {}

	async sign(userId: string): Promise<string> {
		return jwt.sign({ userId }, this.options.privateKey);
	}

	async verify(token: string) {
		return jwt.verify(token, this.options.privateKey);
	}
}

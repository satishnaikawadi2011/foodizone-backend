import { UsersService } from './../../users/users.service';
import { JwtService } from './../jwt.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		if ('auth-token' in req.headers) {
			const token = req.headers['auth-token'];
			const decoded = await this.jwtService.verify(token.toString());

			if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
				try {
					const user = await this.usersService.findById(decoded['id']);
					req['user'] = user;
				} catch (e) {
					console.log(e);
				}
			}
		}

		next();
	}
}

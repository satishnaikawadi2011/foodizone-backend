import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { assertUnionType } from 'graphql';
import { Observable } from 'rxjs';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());

		if (!roles) {
			// if we havent set any role on the resource that means it is public resource
			return true;
		}
		const gqlContext = GqlExecutionContext.create(context).getContext();
		const token = gqlContext['token'];
		console.log(token);
		if (token) {
			const decoded = await this.jwtService.verify(token.toString());

			if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
				try {
					const user = await this.usersService.findById(decoded['userId']);
					gqlContext['user'] = user;
					if (!user) {
						return false;
					}

					if (roles.includes('Any')) {
						return true;
					}

					return roles.includes(user.role);
				} catch (e) {
					console.log(e);
					return false;
				}
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
}

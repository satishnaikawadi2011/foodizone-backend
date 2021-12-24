import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { assertUnionType } from 'graphql';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());

		if (!roles) {
			// if we havent set any role on the resource that means it is public resource
			return true;
		}

		const gqlContext = GqlExecutionContext.create(context).getContext();
		const user: User = gqlContext['user'];
		if (!user) {
			return false;
		}

		if (roles.includes('Any')) {
			return true;
		}

		return roles.includes(user.role);
	}
}

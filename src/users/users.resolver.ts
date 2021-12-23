import { UserProfileOutput, UserProfileInput } from './dtos/user-profile.dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountOutput, CreateAccountInput } from './dtos/create-accpunt.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query((returns) => String)
	hello() {
		return 'Hello World !!!!';
	}

	@Mutation((returns) => CreateAccountOutput)
	async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
		return this.usersService.createAccount(createAccountInput);
	}

	@Mutation((returns) => LoginOutput)
	async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
		return this.usersService.login(loginInput);
	}

	@Query((returns) => User)
	@UseGuards(AuthGuard)
	me(@AuthUser() authUser: User): User {
		return authUser;
	}

	@UseGuards(AuthGuard)
	@Query((returns) => UserProfileOutput)
	async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
		try {
			const user = await this.usersService.findById(userProfileInput.userId);
			if (!user) {
				return {
					ok: false,
					error: 'User profile not found !'
				};
			}
			return {
				ok: true,
				user
			};
		} catch (err) {
			return {
				ok: false,
				error: 'User profile not found !'
			};
		}
	}
}

import { IsEmail } from 'class-validator';
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
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto';
import { Role } from 'src/auth/role.decorator';

@Resolver((of) => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService, private readonly mailService: MailService) {}

	@Query((returns) => String)
	async hello() {
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

	@Role([
		'Any'
	])
	@Query((returns) => User)
	me(@AuthUser() authUser: User): User {
		return authUser;
	}

	@Role([
		'Any'
	])
	@Query((returns) => UserProfileOutput)
	async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
		return this.usersService.getUserProfile(userProfileInput.userId);
	}

	@Role([
		'Any'
	])
	@Mutation((returns) => EditProfileOutput)
	async editProfile(
		@AuthUser() authUser: User,
		@Args('input') editProfileInput: EditProfileInput
	): Promise<EditProfileOutput> {
		return this.usersService.editProfile(authUser.id, editProfileInput);
	}

	@Mutation((returns) => VerifyEmailOutput)
	verifyEmail(@Args('input') { code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
		return this.usersService.verifyEmail(code);
	}
}

import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-accpunt.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserProfileOutput } from './dtos/user-profile.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	async createAccount({ email, password, role }: CreateAccountInput): Promise<CreateAccountOutput> {
		try {
			const isExist = await this.userRepo.findOne({ email });

			if (isExist) {
				return {
					ok: false,
					error: 'User with this email already exists !'
				};
			}

			await this.userRepo.save(this.userRepo.create({ email, password, role }));
			return { ok: true };
		} catch (error) {
			console.log(error);
			return { ok: false, error: 'Failed to create account , try again later !' };
		}
	}

	async login({ email, password }: LoginInput): Promise<LoginOutput> {
		try {
			const user = await this.userRepo.findOne(
				{ email },
				{
					select:
						[
							'id',
							'password'
						]
				}
			);

			if (!user) {
				return {
					ok: false,
					error: 'User not found !'
				};
			}

			const isValidPassword = await user.verifyPassword(password);

			if (!isValidPassword) {
				return {
					ok: false,
					error: 'Invalid credentials , please try again !'
				};
			}

			const token = await this.jwtService.sign(user.id);

			return { ok: true, token };
		} catch (error) {
			console.log(error);
			return { ok: false, error: 'Failed to login , try again later !' };
		}
	}

	async findById(id: string): Promise<User> {
		return this.userRepo.findOne(id);
	}

	async getUserProfile(id: string): Promise<UserProfileOutput> {
		try {
			const user = await this.findById(id);
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

	async editProfile(id: string, { email, password }: EditProfileInput): Promise<EditProfileOutput> {
		try {
			const user = await this.findById(id);
			if (email) {
				user.email = email;
			}

			if (password) {
				user.password = password;
			}

			await this.userRepo.save(user);
			return { ok: true };
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Failed to edit the profile , try again !!'
			};
		}
	}
}

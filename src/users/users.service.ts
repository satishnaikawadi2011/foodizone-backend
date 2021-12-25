import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-accpunt.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { Verification } from './entities/verification.entity';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailOutput } from './dtos/verify-email.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		@InjectRepository(Verification) private readonly verificationRepo: Repository<Verification>,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService
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

			const user = await this.userRepo.save(this.userRepo.create({ email, password, role }));

			// After creating user , create verification and attach it to user
			// And also send verification code to user via mail service
			const verification = await this.verificationRepo.save(
				this.verificationRepo.create({
					user
				})
			);
			this.mailService.sendVerificationEmail(user.email, verification.code);
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

				// if user changes its email , make them unverified and delete previous verification record from database
				// Also create new verification and send related code to user via mail service
				user.verified = false;
				await this.verificationRepo.delete({ user: { id: user.id } });
				const verification = await this.verificationRepo.save(this.verificationRepo.create({ user }));
				this.mailService.sendVerificationEmail(user.email, verification.code);
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

	async verifyEmail(code: string): Promise<VerifyEmailOutput> {
		try {
			const verification = await this.verificationRepo.findOne(
				{ code },
				{
					relations:
						[
							'user'
						]
				}
			);
			if (verification) {
				verification.user.verified = true;
				await this.userRepo.save(verification.user);
				await this.verificationRepo.delete(verification.id);
				return { ok: true };
			}
			return { ok: false, error: 'Invalid verification code !!.' };
		} catch (error) {
			return { ok: false, error: 'Could not verify email.' };
		}
	}
}

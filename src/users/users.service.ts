import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-accpunt.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

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
}

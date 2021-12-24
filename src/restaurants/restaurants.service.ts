import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantOutput, CreateRestaurantInput } from './dtos/create-restaurant-dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
	constructor(@InjectRepository(Restaurant) private readonly restaurantRepo: Repository<Restaurant>) {}

	async createRestaurant(owner: User, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput> {
		try {
			const newRestaurant = await this.restaurantRepo.create(createRestaurantInput);
			newRestaurant.owner = owner;
			await this.restaurantRepo.save(newRestaurant);
			return { ok: true };
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Failed to create restaurant !!!'
			};
		}
	}
}

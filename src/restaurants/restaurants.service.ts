import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantOutput, CreateRestaurantInput } from './dtos/create-restaurant-dto';
import { EditRestaurantOutput, EditRestaurantInput } from './dtos/edit-restaurant.dto';
import { Category } from './entities/category.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class RestaurantsService {
	constructor(
		@InjectRepository(Restaurant) private readonly restaurantRepo: Repository<Restaurant>,
		private readonly categories: CategoryRepository
	) {}

	async createRestaurant(owner: User, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput> {
		try {
			const newRestaurant = await this.restaurantRepo.create(createRestaurantInput);
			newRestaurant.owner = owner;
			const category = await this.categories.getOrCreate(createRestaurantInput.categoryName);
			newRestaurant.category = category;
			await this.restaurantRepo.save(newRestaurant);
			return {
				ok: true,
				restaurantId: newRestaurant.id
			};
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Failed to create restaurant !!!'
			};
		}
	}

	async editRestaurant(owner: User, editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput> {
		try {
			const { restaurantId } = editRestaurantInput;
			const restaurant = await this.restaurantRepo.findOne(restaurantId);

			if (!restaurant) {
				return {
					ok: false,
					error: 'Restaurant not found !'
				};
			}

			if (owner.id !== restaurant.ownerId) {
				return {
					ok: false,
					error: 'You cannot edit the restaurant which you do not own !'
				};
			}

			let category: Category = null;
			if (editRestaurantInput.categoryName) {
				category = await this.categories.getOrCreate(editRestaurantInput.categoryName);
			}
			await this.restaurantRepo.save([
				{
					id: editRestaurantInput.restaurantId,
					...editRestaurantInput,
					...category && { category }
				}
			]);

			return { ok: true };
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Failed to edit restaurant , please try again !!!'
			};
		}
	}
}

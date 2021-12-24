import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { CreateRestaurantOutput, CreateRestaurantInput } from './dtos/create-restaurant-dto';
import { DeleteRestaurantInput, DeleteRestaurantOutput } from './dtos/delete-restaurant.dto';
import { EditRestaurantOutput, EditRestaurantInput } from './dtos/edit-restaurant.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurants.dto';
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

	async deleteRestaurant(owner: User, { restaurantId }: DeleteRestaurantInput): Promise<DeleteRestaurantOutput> {
		try {
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
					error: "You can't delete a restaurant that you don't own"
				};
			}
			await this.restaurantRepo.delete(restaurantId);
			return {
				ok: true
			};
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Failed to delete restaurant !!'
			};
		}
	}

	async allCategories(): Promise<AllCategoriesOutput> {
		try {
			const categories = await this.categories.find();
			return {
				ok: true,
				categories
			};
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Failed to load categories !!'
			};
		}
	}

	countRestaurants(category: Category) {
		return this.restaurantRepo.count({ category });
	}

	async findCategoryBySlug({ slug, page, pageLength }: CategoryInput): Promise<CategoryOutput> {
		try {
			const category = await this.categories.findOne({ slug });
			if (!category) {
				return {
					ok: false,
					error: 'Category not found !'
				};
			}
			const restaurants = await this.restaurantRepo.find({
				where:
					{
						category
					},
				take: pageLength,
				skip: (page - 1) * pageLength
			});
			const totalResults = await this.countRestaurants(category);
			return {
				ok: true,
				restaurants,
				category,
				totalPages: Math.ceil(totalResults / pageLength),
				totalResults
			};
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Failed to load category !!'
			};
		}
	}

	async allRestaurants({ page, pageLength }: RestaurantsInput): Promise<RestaurantsOutput> {
		try {
			const [
				restaurants,
				totalResults
			] = await this.restaurantRepo.findAndCount({
				skip: (page - 1) * pageLength,
				take: pageLength
			});
			return {
				ok: true,
				results: restaurants,
				totalPages: Math.ceil(totalResults / pageLength),
				totalResults
			};
		} catch (e) {
			console.log(e);
			return {
				ok: false,
				error: 'Could not load restaurants'
			};
		}
	}
}

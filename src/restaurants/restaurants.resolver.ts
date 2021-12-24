import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-restaurant.dto';
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant-dto';
import { DeleteRestaurantInput, DeleteRestaurantOutput } from './dtos/delete-restaurant.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurants.dto';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Mutation((returns) => CreateRestaurantOutput)
	@Role([
		'Owner'
	])
	async createRestaurant(
		@AuthUser() authUser: User,
		@Args('input') createRestaurantInput: CreateRestaurantInput
	): Promise<CreateRestaurantOutput> {
		return this.restaurantsService.createRestaurant(authUser, createRestaurantInput);
	}

	@Mutation((returns) => EditRestaurantOutput)
	@Role([
		'Owner'
	])
	async editRestaurant(
		@AuthUser() owner: User,
		@Args('input') editRestaurantInput: EditRestaurantInput
	): Promise<EditRestaurantOutput> {
		return this.restaurantsService.editRestaurant(owner, editRestaurantInput);
	}

	@Mutation((returns) => DeleteRestaurantOutput)
	@Role([
		'Owner'
	])
	deleteRestaurant(
		@AuthUser() owner: User,
		@Args('input') deleteRestaurantInput: DeleteRestaurantInput
	): Promise<DeleteRestaurantOutput> {
		return this.restaurantsService.deleteRestaurant(owner, deleteRestaurantInput);
	}

	@Query((returns) => RestaurantsOutput)
	restaurants(@Args('input') restaurantsInput: RestaurantsInput): Promise<RestaurantsOutput> {
		return this.restaurantsService.allRestaurants(restaurantsInput);
	}
}

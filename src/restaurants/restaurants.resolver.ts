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
import { RestaurantInput, RestaurantOutput } from './dtos/restaurant.dto';
import { SearchRestaurantInput, SearchRestaurantOutput } from './dtos/search-restaurant.dto';
import { MyRestaurantsOutput } from './dtos/my-restaurants.dto';
import { MyRestaurantInput, MyRestaurantOutput } from './dtos/my-restaurant';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Query((returns) => MyRestaurantsOutput)
	@Role([
		'Owner'
	])
	myRestaurants(@AuthUser() owner: User): Promise<MyRestaurantsOutput> {
		return this.restaurantsService.myRestaurants(owner);
	}

	@Query((returns) => MyRestaurantOutput)
	@Role([
		'Owner'
	])
	myRestaurant(
		@AuthUser() owner: User,
		@Args('input') myRestaurantInput: MyRestaurantInput
	): Promise<MyRestaurantOutput> {
		return this.restaurantsService.myRestaurant(owner, myRestaurantInput);
	}

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

	@Query((returns) => RestaurantOutput)
	restaurant(@Args('input') restaurantInput: RestaurantInput): Promise<RestaurantOutput> {
		return this.restaurantsService.findRestaurantById(restaurantInput);
	}

	@Query((returns) => SearchRestaurantOutput)
	searchRestaurant(@Args('input') searchRestaurantInput: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
		return this.restaurantsService.searchRestaurantByName(searchRestaurantInput);
	}
}

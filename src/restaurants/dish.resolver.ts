import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import { Dish } from './entities/dish.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver((of) => Dish)
export class DishResolver {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Mutation((type) => CreateDishOutput)
	@Role([
		'Owner'
	])
	createDish(@AuthUser() owner: User, @Args('input') createDishInput: CreateDishInput): Promise<CreateDishOutput> {
		return this.restaurantsService.createDish(owner, createDishInput);
	}
}

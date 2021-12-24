import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish.dto';
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

	@Mutation((type) => EditDishOutput)
	@Role([
		'Owner'
	])
	editDish(@AuthUser() owner: User, @Args('input') editDishInput: EditDishInput): Promise<EditDishOutput> {
		return this.restaurantsService.editDish(owner, editDishInput);
	}

	@Mutation((type) => DeleteDishOutput)
	@Role([
		'Owner'
	])
	deleteDish(@AuthUser() owner: User, @Args('input') deleteDishInput: DeleteDishInput): Promise<DeleteDishOutput> {
		return this.restaurantsService.deleteDish(owner, deleteDishInput);
	}
}

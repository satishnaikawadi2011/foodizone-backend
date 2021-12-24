import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { Category } from './entities/category.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver((of) => Category)
export class CategoryResolver {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@ResolveField((type) => Int)
	restaurantCount(@Parent() category: Category): Promise<number> {
		return this.restaurantsService.countRestaurants(category);
	}

	@Query((type) => AllCategoriesOutput)
	allCategories(): Promise<AllCategoriesOutput> {
		return this.restaurantsService.allCategories();
	}

	@Query((type) => CategoryOutput)
	category(@Args('input') categoryInput: CategoryInput): Promise<CategoryOutput> {
		return this.restaurantsService.findCategoryBySlug(categoryInput);
	}
}
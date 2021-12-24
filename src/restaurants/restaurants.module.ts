import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryResolver } from './category.resolver';
import { Dish } from './entities/dish.entity';
import { DishResolver } from './dish.resolver';

@Module({
	imports:
		[
			TypeOrmModule.forFeature([
				Restaurant,
				Dish,
				CategoryRepository
			])
		],
	providers:
		[
			RestaurantsService,
			RestaurantsResolver,
			CategoryResolver,
			DishResolver
		]
})
export class RestaurantsModule {}

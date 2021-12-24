import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryResolver } from './category.resolver';
import { Dish } from './entities/dish.entity';

@Module({
	imports:
		[
			TypeOrmModule.forFeature([
				Restaurant,
				Category,
				CategoryRepository,
				Dish
			])
		],
	providers:
		[
			RestaurantsService,
			RestaurantsResolver,
			CategoryResolver
		]
})
export class RestaurantsModule {}

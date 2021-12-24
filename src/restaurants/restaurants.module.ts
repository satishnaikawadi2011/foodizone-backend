import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { Category } from './entities/category.entity';

@Module({
	imports:
		[
			TypeOrmModule.forFeature([
				Restaurant,
				Category
			])
		],
	providers:
		[
			RestaurantsService,
			RestaurantsResolver
		]
})
export class RestaurantsModule {}

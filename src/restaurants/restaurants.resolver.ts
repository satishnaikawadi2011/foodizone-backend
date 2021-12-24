import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Resolver } from '@nestjs/graphql';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {}

import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class RestaurantInput {
	@Field() restaurantId: string;
}

@ObjectType()
export class RestaurantOutput extends CoreOutput {
	@Field((type) => Restaurant, { nullable: true })
	restaurant?: Restaurant;
}

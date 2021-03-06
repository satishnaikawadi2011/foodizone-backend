import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
	'name',
	'coverImg',
	'address'
]) {
	@Field() categorySlug: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
	@Field((type) => String, { nullable: true })
	restaurantId?: string;
}

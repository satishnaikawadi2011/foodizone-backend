import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
	'name',
	'coverImg',
	'address'
]) {
	@Field() categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}

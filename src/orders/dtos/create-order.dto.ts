import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

import { OrderItemOption } from '../entities/order-item.entity';

@InputType()
class CreateOrderItemInput {
	@Field() dishId: string;

	@Field(
		(type) => [
			OrderItemOption
		],
		{ nullable: true }
	)
	options?: OrderItemOption[];
}

@InputType()
export class CreateOrderInput {
	@Field() restaurantId: string;

	@Field((type) => [
		CreateOrderItemInput
	])
	items: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {
	@Field((type) => String, { nullable: true })
	orderId?: string;
}

import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Payment } from '../entities/payment.entity';

@InputType('ProductDataInputType')
@ObjectType()
export class ProductData {
	@Field()
	@IsString()
	description: string;

	@Field()
	@IsString()
	name: string;

	@Field((type) => [
		String
	])
	images: string[];
}

@InputType('PriceDataInputType')
@ObjectType()
export class PriceData {
	@Field()
	@IsString()
	currency: string;

	@Field()
	@IsNumber()
	unit_amount: number;

	@Field((type) => ProductData)
	product_data: ProductData;
}

@InputType()
@ObjectType()
export class Item {
	@Field()
	@IsNumber()
	quantity: number;

	@Field((type) => PriceData)
	price_data: PriceData;
}

@InputType()
export class CreateCheckoutSessionInput {
	@Field()
	@IsEmail()
	customer_email: string;

	@Field((type) => [
		Item
	])
	line_items: Item[];
}

@InputType()
@ObjectType()
export class LineItem {
	@Field()
	@IsString()
	price: string;

	@Field()
	@IsString()
	description: string;

	@Field()
	@IsString()
	name: string;

	@Field()
	@IsNumber()
	quantity: number;
}

@ObjectType()
export class CreateCheckoutSessionOuput extends CoreOutput {
	@Field((type) => String, { nullable: true })
	session_id?: string;
}

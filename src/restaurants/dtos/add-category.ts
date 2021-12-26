import { Category } from 'src/restaurants/entities/category.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class AddCategoryInput extends PickType(Category, [
	'img',
	'name'
]) {}

@ObjectType()
export class AddCategoryOutput extends CoreOutput {
	@Field((type) => String, { nullable: true })
	categoryId?: string;
}

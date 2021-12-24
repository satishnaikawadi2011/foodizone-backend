import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteDishInput {
	@Field() dishId: string;
}

@ObjectType()
export class DeleteDishOutput extends CoreOutput {}

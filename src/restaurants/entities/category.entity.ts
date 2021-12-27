import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'categories' })
export class Category extends CoreEntity {
	@Field((type) => String)
	@Column({ unique: true })
	@IsString()
	@Length(4)
	name: string;

	@Field((type) => String)
	@Column()
	@IsString()
	img: string;

	@Field((type) => String)
	@Column({ unique: true })
	@IsString()
	slug: string;

	@Field(
		(type) => [
			Restaurant
		],
		{ nullable: true }
	)
	@OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
	restaurants: Restaurant[];
}

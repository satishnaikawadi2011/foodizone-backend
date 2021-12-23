import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class CoreEntity {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}

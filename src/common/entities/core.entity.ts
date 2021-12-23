import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CoreEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	@CreateDateColumn() createdAt: Date;

	@UpdateDateColumn() updatedAt: Date;
}

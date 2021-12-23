import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { AfterInsert, BeforeInsert, Column, Entity } from 'typeorm';
import * as argon from 'argon2';
import { InternalServerErrorException } from '@nestjs/common';

enum UserRole {
	Client,
	Owner,
	Delivery
}

registerEnumType(UserRole, { name: 'UserRole' });
@InputType({ isAbstract: true })
@Entity({ name: 'users' })
@ObjectType()
export class User extends CoreEntity {
	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	password: string;

	@Field((type) => UserRole)
	@Column({ type: 'enum', enum: UserRole })
	role: UserRole;

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		try {
			this.password = await argon.hash(this.password);
		} catch (error) {
			console.error(error);
			throw new InternalServerErrorException('Something went wrong , please try again !');
		}
	}
}

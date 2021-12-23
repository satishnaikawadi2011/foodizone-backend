import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { AfterInsert, BeforeInsert, Column, Entity } from 'typeorm';
import * as argon from 'argon2';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

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
	@IsEmail()
	email: string;

	@Field()
	@Column()
	@IsString()
	@Length(6, 12)
	password: string;

	@Field((type) => UserRole)
	@Column({ type: 'enum', enum: UserRole })
	@IsEnum(UserRole)
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

	async verifyPassword(pswrd: string): Promise<boolean> {
		try {
			return await argon.verify(this.password, pswrd);
		} catch (error) {
			console.error(error);
			throw new InternalServerErrorException('Something went wrong , please try again !');
		}
	}
}

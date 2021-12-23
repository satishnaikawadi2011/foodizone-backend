import { ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

export type UserRole = 'client' | 'owner' | 'delivery';

@Entity()
@ObjectType()
export class User extends CoreEntity {
	@Column() email: string;

	@Column() password: string;

	@Column() role: UserRole;
}

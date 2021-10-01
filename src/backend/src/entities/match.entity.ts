import { AbstractEntity } from './abstract-entity';
import { Entity, Column, BeforeInsert, ManyToMany, JoinTable, JoinColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { UserEntity } from './user.entity';
import { User } from 'src/auth/user.decorator';

@Entity('match')
export class MatchEntity extends AbstractEntity {
	
	@Column({nullable: true})
	winnerId: number;

	@ManyToOne(() => UserEntity)
	user1: UserEntity;

	@ManyToOne(()=> UserEntity)
	user2: UserEntity;

	@Column({ nullable: true })
	user2Id: number;

	@Column({ nullable: true })
	user1Id: number;

	toJSON() {
		return classToPlain(this);
	}
}

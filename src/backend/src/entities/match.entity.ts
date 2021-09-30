import { AbstractEntity } from './abstract-entity';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { classToPlain } from 'class-transformer';

@Entity('match')
export class MatchEntity extends AbstractEntity {
	
	@Column({default: 7})
	id_winner: number;

	@Column({default: 3})
	id_user1: number;

	@Column({default: 2})
	id_user2: number;

	toJSON() {
	return classToPlain(this);
	}
}

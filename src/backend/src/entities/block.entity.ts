import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { UserEntity } from "./user.entity";

@Entity()
export class BlockEntity extends AbstractEntity {
	
	@Column()
	targetId: number;

	target: UserEntity;

	@Column()
	blockerId: number;
}
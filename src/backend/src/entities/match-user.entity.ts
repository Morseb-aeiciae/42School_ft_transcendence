import { User } from "src/auth/user.decorator";
import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { MatchEntity } from "./match.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class Match_userEntity extends AbstractEntity
{
	@Column({nullable: true})
	points: number;

	@Column({nullable : true})
	winner: boolean;

	@Column()
	matchId: number;

	@Column()
	userId: number;

	@ManyToOne(() => MatchEntity, MatchEntity => MatchEntity.match_user)
	public match!: MatchEntity;

	@ManyToOne(() => UserEntity, UserEntity => UserEntity.match_user)
	public user!: UserEntity;
}
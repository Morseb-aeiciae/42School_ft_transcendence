import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { Match_userEntity } from "./match-user.entity";

@Entity()
export class MatchEntity extends AbstractEntity
{
	@Column({default: 7})
	pts_limit: number;

	@Column({default: 0})
    game_mode: boolean;

	@OneToMany(() => Match_userEntity, Match_userEntity => Match_userEntity.match)
	public match_user!: Match_userEntity[];
}
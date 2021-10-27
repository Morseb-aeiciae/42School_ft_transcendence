import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { Match_userEntity } from "./match-user.entity";

@Entity()
export class MatchEntity extends AbstractEntity
{
	@Column({default: 30})
	pts_limit: number;

	@OneToMany(() => Match_userEntity, Match_userEntity => Match_userEntity.match)
	public match_user!: Match_userEntity[];
}
import { IsBoolean, IsNumber, IsObject, IsOptional } from "class-validator";
import { UserEntity } from "src/entities/user.entity";

export class MatchDTO {

	@IsObject()
	user1: UserEntity;

	@IsObject()
	user2: UserEntity;

	@IsOptional()
	pts_limit: number;
}

export class UpdateMatchDTO {

	@IsBoolean()
	winner: boolean;

	@IsNumber()
	points: number;

	@IsNumber()
	matchId: number;

	@IsNumber()
	userId: number;
}
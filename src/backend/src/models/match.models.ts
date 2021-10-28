import { IsBoolean, IsNumber, IsObject, IsOptional } from "class-validator";
import { UserEntity } from "src/entities/user.entity";

export class MatchDTO {

	@IsNumber()
	user1: number;

	@IsNumber()
	user2: number;

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
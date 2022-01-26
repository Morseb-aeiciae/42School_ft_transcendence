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
	winner_0: boolean;

	@IsNumber()
	points_0: number;

	@IsNumber()
	userId_0: number;

	@IsBoolean()
	winner_1: boolean;

	@IsNumber()
	points_1: number;

	@IsNumber()
	userId_1: number;

	@IsBoolean()
	game_mode: boolean;
}
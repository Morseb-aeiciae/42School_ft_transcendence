import { isNumber, IsNumber } from "class-validator";

export class matchDTO
{
	@IsNumber()
	id_user1: number;

	@IsNumber()
	id_user2: number;

}

export class matchUpdateDTO
{
	@IsNumber()
	id: number;

	@IsNumber()
	id_winner: number;
}
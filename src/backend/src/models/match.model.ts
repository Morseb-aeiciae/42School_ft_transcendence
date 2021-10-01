import { isNumber, IsNumber } from "class-validator";
import { UserEntity } from "src/entities/user.entity";

export class matchDTO
{

	user1: UserEntity;

	user2: UserEntity;

}

export class matchUpdateDTO
{
	@IsNumber()
	id: number;

	@IsNumber()
	winnerId: number;
}

export class AllMatchFromUsersDTO
{
	@IsNumber()
	id_user: number;
}
import { IsNegative, IsNumber } from "class-validator";

export class SetAdminDTO {

	@IsNumber()
	chatId: number;

	@IsNumber()
	ownerId: number;

	@IsNumber()
	adminId: number;
}

export class BanUserDTO {
	
	@IsNumber()
	targetId: number;

	@IsNumber()
	adminId: number

	@IsNumber()
	chatId: number;
}

export class MuteUserDTO {
	
	@IsNumber()
	targetId: number;

	@IsNumber()
	adminId: number

	@IsNumber()
	chatId: number;
}
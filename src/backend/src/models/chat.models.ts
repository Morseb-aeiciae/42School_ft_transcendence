import { IsBoolean, IsEnum, isNumber, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ChatEntity } from "src/entities/chat.entity";
import { UserEntity } from "src/entities/user.entity";
import { isNullOrUndefined } from "util";



export class ChatDTO {

	@IsString()
	@MinLength(2)
	@MaxLength(10)
	name: string;

	@IsOptional()
	@IsString()
	@MinLength(2)
	@MaxLength(10)
	password: string;

	@IsNumber()
	ownerId: number;
}

export class addUserToChatDTO {
	
	@IsNumber()
	userId: number;

	@IsNumber()
	chatId: number;

	@IsOptional()
	@IsString()
	password: string;
}

export class AddMessageDTO {

	@IsNumber()
	chatId: number;

	@IsNumber()
	userId: number;

	@IsString()
	message: string;
}

export class FindMessageDTO {
	
	@IsNumber()
	chatId: number;

	@IsNumber()
	userId: number;

}

export class DirectChatDTO {

	@IsNumber()
	userId_1: number;

	@IsNumber()
	userId_2: number;
}

export class BlockUserDTO {
	
	@IsNumber()
	targetId: number;

	@IsNumber()
	blockerId: number;
}

export class FindBlockedUsersDTO {
	
	@IsNumber()
	userId: number;
}

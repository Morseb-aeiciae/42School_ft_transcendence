import { IsNumber } from "class-validator";

export class AdminDeleteChatDTO {

    @IsNumber()
    chatId: number;
}

export class AdminBanUserDTO {

    @IsNumber()
    userId: number;
}

export class ChatRightsDTO {

    @IsNumber()
    userId: number;

    @IsNumber()
    chatId: number;
}
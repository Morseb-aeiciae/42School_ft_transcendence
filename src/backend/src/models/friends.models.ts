import { IsNumber } from "class-validator";

export class SendFriendInviteDTO {
    
    @IsNumber()
    userId: number;

    @IsNumber()
    targetId: number;

}
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class TwoFactorAuthenticationCodeDto
{
     @IsNotEmpty()
    @IsNumberString()
    @IsString()
    twoFactorAuthenticationCode: string;
}
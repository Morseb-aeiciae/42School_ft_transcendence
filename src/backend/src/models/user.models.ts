import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(5)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export interface AuthPayload {
  username: string;
}

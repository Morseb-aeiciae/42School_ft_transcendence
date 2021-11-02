import {
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	MinLength,
  } from 'class-validator';
  
  export class LoginWithTokenDTO {
	@IsEmail()
	@IsString()
	@MinLength(5)
	email: string;
  
	@IsString()
	token: string;
  }
  
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
  
  export class UpdateUserDTO {
	@IsEmail()
	@IsString()
	@MinLength(5)
	@IsOptional()
	email: string;
  
	@IsOptional()
	image: string;
  }
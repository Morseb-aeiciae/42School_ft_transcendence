import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDTO,
  RegisterDTO,
  LoginWithTokenDTO,
} from '../models/user.models';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
  @Post('/loginWithToken')
  loginWithToken(@Body(ValidationPipe) credentials: LoginWithTokenDTO) {
    return this.authService.loginWithToken(credentials);
  }
}

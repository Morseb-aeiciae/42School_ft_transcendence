import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from '../models/user.models';

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
}

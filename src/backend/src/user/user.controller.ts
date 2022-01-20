import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from '../models/user.models';
import JwtTwoFactorGuard from 'src/auth/guard/jwt.TwoAuth.guard';
import RequestWithUser from 'src/auth/twoFactorAuth/requestWithUser.interface';
import { Status } from 'src/status.enum';

@UseGuards(JwtTwoFactorGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post("updateUser")
  update(@Body(new ValidationPipe()) data: UpdateUserDTO) {
    return this.userService.updateUser(data);
  }

  @Get("turnOnTwoFa")
  TurnOnTwoFa(@Req() request: RequestWithUser) {
    return this.userService.turnOnTwoFactorAuthentication(request.user.id); 
  }

  @Get("turnOffTwoFa")
  TurnOffTwoFa(@Req() request: RequestWithUser) {
    return this.userService.turnOffTwoFactorAuthentication(request.user.id); 
  }

  @Get("findUserToken")
  findUserToken(@Req() request: RequestWithUser) { 
    return this.userService.findUserToken(request.user.id);
  }

  @Get("findUserToken")
  changeStatus(@Req() request: RequestWithUser) { 
    return this.userService.changeStatus(request.user.id, Status.Offline);
  }
}

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import passport from 'passport';
import { takeWhile } from 'rxjs';
import { createUserDTO } from 'src/models/user.models';
import { Status } from 'src/status.enum';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SchoolAuthGuard } from './guard/42.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import JwtTwoFactorGuard from './guard/jwt.TwoAuth.guard';
export interface RegistrationStatus {
  success: boolean;
  message: string;
}

var compt = 0;

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('login')
  login(@Res({ passthrough: true }) res: Response) {
    const api42 =
	"https://api.intra.42.fr/oauth/authorize?client_id=4b246ff59cfa4b2fa13f340cb680a2eb8c6428afcaf81a92d544f1537680741c&redirect_uri=http%3A%2F%2F10.3.8.3%3A3000%2Fauth%2F&response_type=code";
    return api42;
  }

//   @Get('redirec')
//   @UseGuards(SchoolAuthGuard)
//   async redirectSchool(
//     @Res({ passthrough: true }) res: Response,
//     @Req() req: Request,
//   ) {

//   let username, mail;

//   username = "user_" + compt;
//   mail = "mail_" + compt + "@gmail.com";

//   compt += 1;

//     return await this.authService.login(
//   	username,
//   	mail,
//     );

//     // return await this.authService.login(
//     //   req.user['username'],
//     //   req.user['email'],
//     // );
//   }
  
  @Get('redirec')
  @UseGuards(SchoolAuthGuard)
  async redirectSchool(@Req() req: Request) {
    return await this.authService.login(
      req.user['username'],
      req.user['email'],
    );
  }

  /*
  @UseGuards(JwtAuthGuard)
  @Get('profile/:username')
  async status(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }*/

  @Get('logout')
  @UseGuards(JwtTwoFactorGuard)
  logout(@Res({ passthrough: true }) response: Response, @Req() req) {
    this.userService.changeStatus(req.user.id, Status.Offline);
    response.redirect('/');
    return;
  }
}

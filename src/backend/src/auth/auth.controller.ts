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
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { createUserDTO } from 'src/models/user.models';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SchoolAuthGuard } from './guard/42.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
export interface RegistrationStatus {
  success: boolean;
  message: string;
}
import passport from 'passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('login')
  // @UseGuards(SchoolAuthGuard)
  login() {
    passport.authenticate('local', {
      successRedirect: 'http://localhost:3000/2fa',
      // 'https://api.intra.42.fr/oauth/authorize?client_id=4b246ff59cfa4b2fa13f340cb680a2eb8c6428afcaf81a92d544f1537680741c&redirect_uri=http%3A%2F%2Flocalhost%2Fauth%2F&response_type=code',
      failureRedirect: 'http://localhost:3000/auth',
    });
    return;
  }

  @Get('redirec')
  @UseGuards(SchoolAuthGuard)
  async redirectSchool(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return await this.authService.login(
      req.user['username'],
      req.user['email'],
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:username')
  async status(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    req.logout();
    res.redirect('/');
    return;
  }
}

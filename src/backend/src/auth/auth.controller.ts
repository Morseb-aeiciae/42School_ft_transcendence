<<<<<<< HEAD
import { Body, Controller, Get, Param, Post, Req, Res,  UseGuards, ValidationPipe } from '@nestjs/common';
=======
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
>>>>>>> test
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

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('login')
  @UseGuards(SchoolAuthGuard)
  login() {
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
    /*        const user = await this.authService.addUser(req.user['username'], req.user['email']);
		const accessToken = this.jwtService.sign(user.username);
		res.cookie('jwt', accessToken);
        res.status(302).redirect("http://localhost");
        return user; */
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:username')
  async status(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return;
  }
}

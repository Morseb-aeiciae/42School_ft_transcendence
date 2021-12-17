import { Controller, Get, Param, Req, Res,  UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SchoolAuthGuard } from './guard/42.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
       private userService : UserService,
       private jwtService : JwtService) {}
    
    @Get('login')
    @UseGuards(SchoolAuthGuard)
    login() {
        return ;
    }

    @Get('redirect')
    @UseGuards(SchoolAuthGuard)
    async redirectSchool(@Res({passthrough: true}) res: Response, @Req() req: Request) {
        const user = await this.authService.addUser(req.user['username'], req.user['email']);
        const token = this.jwtService.sign(user.username);
       // res.cookie("acces_token", token, {httpOnly : true})
       console.log(req.user["username"]);
   /* res
        .cookie('access_token', token, {
          httpOnly: true,
          domain: 'localhost', // your domain here!
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        .send({ success: true });*/
        res.cookie('access_token', token, {
            httpOnly: true,
          });
       // res.status(302).redirect("http://localhost:3000");
        return user;
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('profile/:username')
    async status(@Param("username") username: string) {
        return this.userService.findByUsername(username);
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
        logout(@Res({ passthrough: true }) response: Response) {
          response.clearCookie('access_token');
          return;
        }
} 

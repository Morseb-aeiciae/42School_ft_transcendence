import {
    ClassSerializerInterceptor,
    Controller,
    Header,
    Post,
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    HttpCode,
    Body,
    UnauthorizedException,
  } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import RequestWithUser from './requestWithUser.interface';
import { toFileStream } from 'qrcode';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from 'src/models/TwoFactorAuthenticationCodeDto';
import { AuthService } from 'src/auth/auth.service';
@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
    constructor(
      private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
      private readonly userService: UserService,
      private readonly authService: AuthService
    ) {}
   
    @Post('generate')
    //@UseGuards(JwtAuthGuard)
    async register(@Res() response: Response, @Req() request: RequestWithUser) {

        const user = await this.userService.findByUsername("blorin");
        request.user = user;
      const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);
      //return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
      console.log( user.twoFactorAuthenticationSecret);
      return toFileStream(response, otpauthUrl);
    }

    @Post('turn-on')
    @HttpCode(200)
   // @UseGuards(JwtAuthGuard)
    async turnOnTwoFactorAuthentication(
      @Req() request: RequestWithUser,
      @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
    ) {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, request.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      await this.userService.turnOnTwoFactorAuthentication(request.user.id);
    }

    @Post('authenticate')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async authenticate(
      @Req() request: RequestWithUser,
      @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
    ) {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, request.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
   
      const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id, true);
   
      request.res.setHeader('Set-Cookie', [accessTokenCookie]);
   
      return request.user;
    }

}

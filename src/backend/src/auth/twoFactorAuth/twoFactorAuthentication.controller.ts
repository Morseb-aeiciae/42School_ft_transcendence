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
    ValidationPipe,
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
import { authenticator } from 'otplib';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
    constructor(
      private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
      private readonly userService: UserService,
      private readonly authService: AuthService
    ) {}
   
    @Post('generate')
    @UseGuards(JwtAuthGuard)
    async register(@Res() response: Response, @Req() request: RequestWithUser) {
      const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);
      return toFileStream(response, otpauthUrl);
    }

    @Post('authenticate')
    @UseGuards(JwtAuthGuard)
    async authenticate(@Body(ValidationPipe) fa : TwoFactorAuthenticationCodeDto, @Req() request: RequestWithUser ) {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        fa.twoFactorAuthenticationCode, request.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      const accessToken = this.authService.getCookieWithJwtAccessToken(request.user.id, true);
      const user = request.user;
      const tab = { user , accessToken};
      return tab;
    }

}

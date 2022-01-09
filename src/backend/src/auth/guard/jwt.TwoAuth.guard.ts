import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
 
@Injectable()
export default class JwtTwoFactorGuard extends AuthGuard('jwt-two-factor') {}
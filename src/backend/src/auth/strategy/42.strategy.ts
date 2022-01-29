import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { doesNotMatch } from 'assert';
/* eslint-disable */
// @ts-ignore
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from './../auth.service';


const callBack = "http://172.31.141.126:3000/auth/"
@Injectable()
export class SchoolStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CLIENT_UID,
      clientSecret: process.env.SECRET,
      callbackURL: callBack,
      scope: ['public'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { username, emails } = profile;
    const details = {
      username: username,
      email: emails[0].value,
    };
    done(null, details);
    return details;
  }
}

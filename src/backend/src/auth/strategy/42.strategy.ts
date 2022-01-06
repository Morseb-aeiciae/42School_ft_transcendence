import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { doesNotMatch } from 'assert';
/* eslint-disable */
// @ts-ignore
import { Strategy, Profile,  VerifyCallback } from 'passport-42';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from './../auth.service';

@Injectable()
export class SchoolStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private authService : AuthService) {
        super({
            clientID: process.env.CLIENT_UID,
            clientSecret: process.env.SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ['public'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
     
        const {username, emails} = profile;
        const details = {
            username : username, 
            email : emails[0].value};
      //  console.log(username,  details.email);
	  return details;
        done(null, details);
       // await this.authService.valiateUser(details);
    }
}
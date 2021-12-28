import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response, urlencoded } from 'express';
import { UserService } from 'src/user/user.service';
import TokenPayload from './token.payload.interface';

@Injectable()
export class AuthService {
    configService: any;
    constructor(  private jwtService: JwtService,
        private userService : UserService) {}
    
    validateUser(req : any) {
       // console.log(req.avatar);

        }

   async addUser(username : string, mail : string) {
      // console.log(mail);
        const user = await this.userService.findByUsername(username);
        if (user == undefined)
        {
           const newU = await this.userService.createUser(username, mail);
		   return newU;
        }
        return user;
    }

    findUser() {
        throw new Error("dfsdf")
    }

    public getCookieWithJwtAccessToken(userId: number, isSecondFactorAuthenticated = false) {
        const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
      }
}


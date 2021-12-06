import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private userService : UserService) {
    super({
    jwtFromRequest: (req) => {
        if (!req || !req.cookies) {
          return null;
        }
        return req.cookies['access_token'];
    },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) : Promise<any> {
    const user = await this.userService.findByUsername(payload);
    if (user == undefined)
      return false;
    return true; 
  }
}

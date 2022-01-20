import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response, urlencoded } from 'express';
import { Status } from 'src/status.enum';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './strategy/jwt.strategy';
import TokenPayload from './token.payload.interface';

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

@Injectable()
export class AuthService {
  configService: any;
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(payload: TokenPayload) {
    const user = await this.userService.findById(payload.userId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async register(username: string, mail: string): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userService.createUser(username, mail);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(username: string, mail: string): Promise<any> {
    // find user in db
    let user = await this.userService.findByUsername(username);
    if (user == undefined) {
      user = await this.userService.createUser(username, mail);
    }
    // generate and sign token
    const token = this.getCookieWithJwtAccessToken(user.id);

    const isBan: Boolean = false;
    const tab = { user, token, isBan };
    tab.user = user;
    tab.token = token;
    tab.isBan = user.isBan;
    if (user.isTwoFactorAuthenticationEnabled == true) tab.user = undefined;
    if (isBan == false && tab.user != undefined)
    this.userService.changeStatus(user.id, Status.Online);
    return tab;
  }
  /*
    private _createToken(username: string): any {
        const isSecondFactorAuthenticated = false;
        const user: SimpleTokenPayload = { username,  isSecondFactorAuthenticated};
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }*/

  async addUser(username: string, mail: string) {
    const user = await this.userService.findByUsername(username);
    if (user == undefined) {
      let test = await this.userService.createUser(username, mail);
      return test;
    }
    return user;
  }

  findUser() {
    throw new Error('dfsdf');
  }

  public getCookieWithJwtAccessToken(
    userId: number,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }
}

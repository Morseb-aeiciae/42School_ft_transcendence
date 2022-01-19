import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { UserService } from 'src/user/user.service';
import { UserEntity } from '../../entities/user.entity';
import { toFileStream } from 'qrcode';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { Status } from 'src/status.enum';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  public async generateTwoFactorAuthenticationSecret(user: UserEntity) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      'transcendence',
      secret,
    );

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

    return otpauthUrl;
  }
  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: UserEntity,
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }
    async turnOffTwoFactorAuthentication(userId: number) {
    const user = await this.usersService.findById(userId);
    user.isTwoFactorAuthenticationEnabled = false;
    user.save();
    const token = this.authService.getCookieWithJwtAccessToken(user.id, false);
    const ret = {token, user};
    this.usersService.changeStatus(user.id, Status.Online);
    return ret;
  }
}

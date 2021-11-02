import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginDTO,
  RegisterDTO,
  LoginWithTokenDTO,
} from '../models/user.models';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(credentials: LoginDTO) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: credentials.email },
      });
      const isValid: boolean =
        user && (await user.comparePassword(credentials.password));

      if (isValid) {
        const payload = { username: user.username };
        const token = this.jwtService.sign(payload);
        return { user: { ...user.toJSON(), token } };
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (e) {
      throw e;
    }
  }

  async loginWithToken(credentials: LoginWithTokenDTO) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: credentials.email },
      });
      const isValid: boolean =
        user && !!(await this.jwtService.verify(credentials.token));

      if (isValid) {
        const payload = { username: user.username };
        return { user: { ...user.toJSON() } };
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (e) {
      // throw e;
    }
  }
}

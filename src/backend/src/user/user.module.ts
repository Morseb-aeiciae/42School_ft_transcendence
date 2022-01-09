import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileController } from './profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtTwoFactorStrategy } from 'src/auth/strategy/jwtTwoFactorStrategy';

@Module({
  imports: [ PassportModule.register({
		defaultStrategy: 'jwt-two-factor',
		property: 'user',
		session: false,
	}),TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, ConfigService, JwtTwoFactorStrategy],
  controllers: [UserController, ProfileController],
})
export class UserModule {}

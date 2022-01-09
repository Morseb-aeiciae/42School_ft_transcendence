import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTwoFactorStrategy } from 'src/auth/strategy/jwtTwoFactorStrategy';
import { FriendsEntity } from 'src/entities/friends.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [ PassportModule.register({
		defaultStrategy: 'jwt-two-factor',
		property: 'user',
		session: false,
	}),TypeOrmModule.forFeature([UserEntity]),	
  TypeOrmModule.forFeature([FriendsEntity])],
  providers: [FriendsService, ConfigService, JwtTwoFactorStrategy, UserService],
  controllers: [FriendsController]
})
export class FriendsModule {}

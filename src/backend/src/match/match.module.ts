import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTwoFactorStrategy } from 'src/auth/strategy/jwtTwoFactorStrategy';
import { Match_userEntity } from 'src/entities/match-user.entity';
import { MatchEntity } from 'src/entities/match.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
	imports: [PassportModule.register({
		defaultStrategy: 'jwt-two-factor',
		property: 'user',
		session: false,
	}),TypeOrmModule.forFeature([MatchEntity]),
		TypeOrmModule.forFeature([Match_userEntity]),
		TypeOrmModule.forFeature([UserEntity])],
	providers: [MatchService, ConfigService, JwtTwoFactorStrategy, UserService],
	controllers: [MatchController]
})
export class MatchModule {
}

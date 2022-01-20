import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SchoolAuthGuard } from './guard/42.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { SchoolStrategy } from './strategy/42.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TwoFactorAuthenticationController } from './twoFactorAuth/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './twoFactorAuth/twoFactorAuthentication.service';


@Module({
    imports: [ 
	  
        TypeOrmModule.forFeature([UserEntity]),
       forwardRef(() => UserModule),
	   PassportModule.register({
		defaultStrategy: 'jwt',
		property: 'user',
		session: false,
		expiresIn: 10
	}),
	JwtModule.register({
		secret: process.env.JWT_SECRET, signOptions: {
			expiresIn: 3600,
		},
	}),
        ],
    providers: [SchoolStrategy, AuthService, UserService, JwtStrategy, TwoFactorAuthenticationService, ConfigService],
    controllers: [AuthController, TwoFactorAuthenticationController],
    exports: [PassportModule , JwtModule]
})
export class AuthModule {}

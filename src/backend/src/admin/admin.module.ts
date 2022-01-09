import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTwoFactorStrategy } from 'src/auth/strategy/jwtTwoFactorStrategy';
import { Chat_userEntity } from 'src/entities/chat-user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({imports: [PassportModule.register({
    defaultStrategy: 'jwt-two-factor',
    property: 'user',
    session: false,
}),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([ChatEntity]),
    TypeOrmModule.forFeature([Chat_userEntity])],
    providers: [AdminService,  UserService, ConfigService, JwtTwoFactorStrategy],
    controllers: [AdminController],
})
export class AdminModule {}

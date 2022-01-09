import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat_userEntity } from 'src/entities/chat-user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatAdminService } from './admin/admin.service';
import { ChatAdminModule } from './admin/admin.module';
import { BlockEntity } from 'src/entities/block.entity';
import { ChatAdminController } from './admin/admin.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtTwoFactorStrategy } from 'src/auth/strategy/jwtTwoFactorStrategy';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [ PassportModule.register({
		defaultStrategy: 'jwt-two-factor',
		property: 'user',
		session: false,
	}),TypeOrmModule.forFeature([ChatEntity]), 
		TypeOrmModule.forFeature([Chat_userEntity]),
		TypeOrmModule.forFeature([MessageEntity]),
		TypeOrmModule.forFeature([UserEntity]),
		TypeOrmModule.forFeature([BlockEntity]),
		ChatAdminModule],
	providers: [ChatService, UserService, ChatAdminService, ConfigService, JwtTwoFactorStrategy],
	controllers: [ChatController, ChatAdminController],  

})
export class ChatModule {
}

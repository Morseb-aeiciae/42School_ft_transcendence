import { Module } from '@nestjs/common';
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

@Module({
	imports: [TypeOrmModule.forFeature([ChatEntity]),
		TypeOrmModule.forFeature([Chat_userEntity]),
		TypeOrmModule.forFeature([MessageEntity]),
		TypeOrmModule.forFeature([UserEntity]),
		TypeOrmModule.forFeature([BlockEntity]),
		ChatAdminModule],
	providers: [ChatService, ChatAdminService],
	controllers: [ChatController, ChatAdminController]})
export class ChatModule {
}

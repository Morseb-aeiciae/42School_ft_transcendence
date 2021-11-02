import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat_userEntity } from 'src/entities/chat-user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { BlockEntity } from 'src/entities/block.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ChatEntity]),
		TypeOrmModule.forFeature([Chat_userEntity]),
		TypeOrmModule.forFeature([MessageEntity]),
		TypeOrmModule.forFeature([UserEntity]),
		TypeOrmModule.forFeature([BlockEntity]),
		AdminModule],
	providers: [ChatService, AdminService],
	controllers: [ChatController, AdminController]})
export class ChatModule {
}

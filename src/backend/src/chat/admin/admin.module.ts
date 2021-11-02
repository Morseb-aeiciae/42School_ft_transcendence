import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat_userEntity } from 'src/entities/chat-user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({imports: [TypeOrmModule.forFeature([ChatEntity]),
	TypeOrmModule.forFeature([Chat_userEntity]),
	TypeOrmModule.forFeature([MessageEntity]),
	TypeOrmModule.forFeature([UserEntity])],
	providers: [AdminService],
	controllers: [AdminController]
})
export class AdminModule {}

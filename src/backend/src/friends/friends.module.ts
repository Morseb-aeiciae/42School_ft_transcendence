import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsEntity } from 'src/entities/friends.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [	TypeOrmModule.forFeature([UserEntity]),	
  TypeOrmModule.forFeature([FriendsEntity])],
  providers: [FriendsService],
  controllers: [FriendsController]
})
export class FriendsModule {}

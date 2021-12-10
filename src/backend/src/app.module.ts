import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database-connection.service';
import { UserModule } from './user/user.module';
import { MatchModule } from './match/match.module';
import { ChatModule } from './chat/chat.module';
import { FriendsController } from './friends/friends.controller';
import { FriendsModule } from './friends/friends.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';
import { GoogleModule } from './google/google.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    AuthModule,
    UserModule,
	MatchModule,
	ChatModule,
	FriendsModule,
	GoogleModule,
 
        ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

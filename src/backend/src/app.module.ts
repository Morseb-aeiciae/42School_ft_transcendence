import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database-connection.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    AuthModule,
    UserModule,
	MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

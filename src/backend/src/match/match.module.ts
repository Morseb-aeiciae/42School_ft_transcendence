import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match_userEntity } from 'src/entities/match-user.entity';
import { MatchEntity } from 'src/entities/match.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
	imports: [TypeOrmModule.forFeature([MatchEntity]),
		TypeOrmModule.forFeature([Match_userEntity]),
		TypeOrmModule.forFeature([UserEntity])],
	providers: [MatchService],
	controllers: [MatchController]
})
export class MatchModule {
}

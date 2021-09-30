import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from 'src/entities/match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([MatchEntity])],
	providers: [MatchService],
	controllers: [MatchController],
})
export class MatchModule {}

import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AllMatchFromUsersDTO, matchDTO, matchUpdateDTO } from 'src/models/match.model';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
	constructor(private matchService: MatchService) {}

	@Post()
	createMatch(@Body(ValidationPipe) UserId: matchDTO) {
		return this.matchService.createMatch(UserId);
	}

	@Get()
	getAll() {
		return this.matchService.getAll();
	}

	@Post('matchId')
	getOneById(@Body(ValidationPipe) id:number) {
		return this.matchService.getOneById(id);
	}

	@Post('matchOver')
	updateMatch(@Body(ValidationPipe) winnerId: matchUpdateDTO) {
		return this.matchService.updateMatch(winnerId);
	}

	@Post('UserMatchs')
	findAllMatchsByUserId(@Body(ValidationPipe) id: AllMatchFromUsersDTO) {
		return this.matchService.findAllMatchsByUserId(id);
	}

	@Post('UserWins')
	findAllWinsByUserId(@Body(ValidationPipe) id: AllMatchFromUsersDTO) {
		return this.matchService.findAllWinsByUserId(id);
	}
}

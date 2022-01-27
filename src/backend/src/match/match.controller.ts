import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchDTO, UpdateMatchDTO } from 'src/models/match.models';
import JwtTwoFactorGuard from 'src/auth/guard/jwt.TwoAuth.guard';

@UseGuards(JwtTwoFactorGuard)
@Controller('match')
export class MatchController {
	constructor(private MatchService: MatchService) {}

	@Post('createMatch')
	async createMatch(@Body(ValidationPipe) matchInfo: UpdateMatchDTO) {
		return this.MatchService.createMatch(matchInfo);
	}

	@Get('getUsersOfMatch/:id')
	async getUsersOfMatch(@Param('id') id: number) {
		return this.MatchService.getUsersOfMatch(id);
	}

	@Get('getMatch/:id')
	async getMatch(@Param('id') id: number) {
		return this.MatchService.getMatch(id);
	}

	// @Post('updateMatch')
	// async updateMatch(@Body(ValidationPipe) updateInfo: UpdateMatchDTO) {
	// 	return this.MatchService.updateMatch(updateInfo);
	// }

	@Get('getMatchsOfUser/:id')
	async getMatchsOfUser(@Param('id') id: number) {
		return this.MatchService.getMatchsOfUser(id);
	}
}

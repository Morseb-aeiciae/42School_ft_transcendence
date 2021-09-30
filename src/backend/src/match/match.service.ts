import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert/strict';
import { MatchEntity } from 'src/entities/match.entity';
import { matchDTO, matchUpdateDTO } from 'src/models/match.model';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
	constructor(
		@InjectRepository(MatchEntity) private matchRepo: Repository<MatchEntity>,
	) {}

	async createMatch(UserId: matchDTO)
	{
		const getid = this.matchRepo.create(UserId);
		await getid.save();
		return {getid: {...getid.toJSON()}};
	}

	getAll(): Promise<MatchEntity[]> {
		return this.matchRepo.find();
	}

 	async getOneById(id: number): Promise<MatchEntity> {
		const match = await this.matchRepo.findOne(id);
		return match;
	}

	async updateMatch(winnerId: matchUpdateDTO): Promise<MatchEntity> {
		const match = await this.getOneById(winnerId.id);
		match.id_winner = winnerId.id_winner;
		return this.matchRepo.save(match);
	}
}

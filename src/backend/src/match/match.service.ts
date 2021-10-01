import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert/strict';
import { MatchEntity } from 'src/entities/match.entity';
import { AllMatchFromUsersDTO, matchDTO, matchUpdateDTO } from 'src/models/match.model';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';

@Injectable()
export class MatchService {
	constructor(
		@InjectRepository(MatchEntity) private matchRepo: Repository<MatchEntity>,
	) {}

	async createMatch(UserId: matchDTO)
	{
		const getid = this.matchRepo.create({user1 : UserId.user1,
			user2 : UserId.user2});
		getid.user1 = UserId.user1;
		getid.user2 = UserId.user2;
		await getid.save();
		return {getid: {...getid}};
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
		match.winnerId = winnerId.winnerId;
		return this.matchRepo.save(match);
	}

	async findAllMatchsByUserId(id_user: AllMatchFromUsersDTO): Promise<MatchEntity[]> {
		const matchs = await getRepository(MatchEntity)
		.createQueryBuilder("match")
		.where ("match.user2Id = :id OR match.user1Id = :id", {id : id_user.id_user})
		.getMany();
		return matchs;
	}

	async findAllWinsByUserId(id_user: AllMatchFromUsersDTO): Promise<MatchEntity[]> {
		const matchs = await getRepository(MatchEntity)
		.createQueryBuilder("match")
		.where ("match.winnerId = :id", {id : id_user.id_user})
		.getMany();
		return matchs;
	}
}

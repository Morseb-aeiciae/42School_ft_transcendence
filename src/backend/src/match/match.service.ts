import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert';
import { Match_userEntity } from 'src/entities/match-user.entity';
import { MatchEntity } from 'src/entities/match.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MatchDTO, UpdateMatchDTO } from 'src/models/match.models';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import MatchsInfo from './MatchInfo.interface';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity) private MatchRepo: Repository<MatchEntity>,
    @InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>,
    @InjectRepository(Match_userEntity)
    private Match_userRepo: Repository<Match_userEntity>,
  ) {}

  async createMatch(matchInfo: MatchDTO) {
    const match = this.MatchRepo.create(matchInfo);
    await match.save();
    await this.addUserToMatch(
      await this.UserRepo.findOne(matchInfo.user1),
      match,
    );
    await this.addUserToMatch(
      await this.UserRepo.findOne(matchInfo.user2),
      match,
    );
    return match;
  }

  async addUserToMatch(user: UserEntity, match: MatchEntity) {
    const match_user = this.Match_userRepo.create();
    match_user.user = user;
    match_user.match = match;
    await match_user.save();
  }

  async getUsersOfMatch(id: number): Promise<UserEntity[]> {
    const user = await getRepository(Match_userEntity)
      .createQueryBuilder('match_user')
      .where('match_user.matchId = :id', { id: id })
      .getMany();

    let i: number = 0;
    let arr: number[] = [];
    while (i < user.length) {
      arr[i] = user[i].userId;
      i++;
    }

    const userArray = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.id IN (:...ids)', { ids: arr })
      .getMany();
    return userArray;
  }

  async getMatch(id: number): Promise<MatchEntity> {
    const match = this.MatchRepo.findOne(id);
    return match;
  }

  async updateMatch(updateInfo: UpdateMatchDTO) {
    const match_user = await getRepository(Match_userEntity)
      .createQueryBuilder('match_user')
      .where('match_user.matchId = :matchId', { matchId: updateInfo.matchId })
      .andWhere('match_user.userId = :userId', { userId: updateInfo.userId })
      .getOne();
    match_user.winner = updateInfo.winner;
    match_user.points = updateInfo.points;
    match_user.save();
    return match_user;
  }

  async getMatchsOfUser(id: number) {
    const matchsUser = await this.getAllMatchsOfUser(id);
    let i: number = 0;
    let retObject: MatchsInfo[] = [];

    if (matchsUser.length == 0) return false;
    while (i < matchsUser.length) {
      const matchs = await getRepository(Match_userEntity)
        .createQueryBuilder('match_user')
        .where('match_user.matchId = :id', { id: matchsUser[i].id })
        .getMany();
      if (matchs) {
        let infoObject: MatchsInfo = await this.fillMatchInfo(matchs);
        retObject.push(infoObject);
      }
      i++;
    }
    return retObject;
  }

  async fillMatchInfo(matchs: Match_userEntity[]) {
    let InfoObject: MatchsInfo;

    InfoObject = {
      user_1: await this.UserRepo.findOne(matchs[0].userId),
      user_2: await this.UserRepo.findOne(matchs[1].userId),
      pts_1: matchs[0].points,
      pts_2: matchs[1].points,
      winner_1: matchs[0].winner,
      winner_2: matchs[1].winner,
    };
    return InfoObject;
  }

  async getAllMatchsOfUser(id: number) {
    const matchs = await getRepository(Match_userEntity)
      .createQueryBuilder('match_user')
      .where('match_user.userId = :id', { id: id })
      .getMany();
    if (matchs.length == 0) return [];
    let i: number = 0;
    let arr: number[] = [];
    while (i < matchs.length) {
      arr[i] = matchs[i].matchId;
      i++;
    }

    const matchArray = await getRepository(MatchEntity)
      .createQueryBuilder('match')
      .where('match.id IN (:...ids)', { ids: arr })
      .getMany();
    return matchArray;
  }
}

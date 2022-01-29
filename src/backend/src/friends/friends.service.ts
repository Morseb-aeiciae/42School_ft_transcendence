import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Send } from 'express';
import { FriendsEntity } from 'src/entities/friends.entity';
import { UserEntity } from 'src/entities/user.entity';
import { SendFriendInviteDTO } from 'src/models/friends.models';
import { getConnection, getRepository, Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>,
    @InjectRepository(FriendsEntity)
    private FriendsRepo: Repository<FriendsEntity>,
  ) {}

  async setBothFriends(data: SendFriendInviteDTO) {
    const friend = await getRepository(FriendsEntity)
      .createQueryBuilder('friend')
      .where('friend.targetId = :targetId', { targetId: data.userId })
      .andWhere('friend.userId = :userId', { userId: data.targetId })
      .getOne();

    if (friend == undefined) return false;
    friend.is_friend = true;
    await friend.save();
    return true;
  }

  async sendFriendInvite(data: SendFriendInviteDTO) {
    const friends = await getRepository(FriendsEntity)
      .createQueryBuilder('friend')
      .where('friend.targetId = :targetId', { targetId: data.targetId })
      .andWhere('friend.userId = :userId', { userId: data.userId })
      .getOne();

    if (friends != undefined) 
    return false;

    const friend = this.FriendsRepo.create(data);
    if ((await this.setBothFriends(data)) == true) friend.is_friend = true;
    await friend.save();
  }

  async isFriends(data: SendFriendInviteDTO) {
    const friend = await getRepository(FriendsEntity)
      .createQueryBuilder('friend')
      .where('friend.targetId = :targetId', { targetId: data.targetId })
      .andWhere('friend.userId= :userId', { userId: data.userId })
      .getMany();
    if (friend[1] == undefined || friend[1].is_friend == false) 
    return false;
    else return true;
  }

  async getListOfFriends(id: number) {
    const friend = await getRepository(FriendsEntity)
      .createQueryBuilder('friend')
      .where('friend.userId = :id', { id: id })
      .andWhere('friend.is_friend = true')
      .getMany();

    if (friend.length == 0) {
      const err = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.id  = :id', { id: 98547 })
        .getMany();
      return err;
    }
    let i: number = 0;
    let arr: number[] = [];
    while (i < friend.length) {
      arr[i] = friend[i].targetId;
      i++;
    }

    const userArray = await getRepository(UserEntity)
      .createQueryBuilder('users')
      .where('users.id IN (:...ids)', { ids: arr })
      .getMany();
    return userArray;
  }

  async removeFriend(data: SendFriendInviteDTO) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(FriendsEntity)
      .where('targetId = :targetId', { targetId: data.targetId })
      .andWhere('userId = :userId', { userId: data.userId })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(FriendsEntity)
      .where('targetId = :targetId', { targetId: data.userId })
      .andWhere('userId = :userId', { userId: data.targetId })
      .execute();
  }
}

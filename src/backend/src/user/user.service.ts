import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from '../models/user.models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async updateUser(username: string, data: UpdateUserDTO) {
    await this.userRepo.update({ username }, data);
    return await this.findByUsername(username);
  }
}

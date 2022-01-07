import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { UpdateUserDTO } from '../models/user.models';
import { Role } from 'src/admin/Role/role.enum';

@Injectable()
export class UserService {
    getById(userId: number) {
        throw new Error('Method not implemented.');
    }
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOne(id);
  }

  async updateUser(data: UpdateUserDTO) {
   const user = await this.userRepo.findOne(data.userId);
   return this.userRepo.save({...user,
      ...data})
  }

  async createUser(username : string, email : string) {
    const repository = getRepository(UserEntity);

    const user =  new UserEntity();
    user.username = username;
    user.email = email;
    user.login = username;
    if (username == "blorin" || username == "smorel")
      user.role = Role.Admin;
    await user.save();
    return user;
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    const user = await this.userRepo.findOne(userId);
    user.twoFactorAuthenticationSecret = secret;
    await user.save();
    return user;
  }

    async turnOnTwoFactorAuthentication(userId: number) {
      return this.userRepo.update(userId, {isTwoFactorAuthenticationEnabled: true});
      }
    
  }

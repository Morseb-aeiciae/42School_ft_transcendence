import { createParamDecorator, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'express';
import { Chat_userEntity } from 'src/entities/chat-user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AdminBanUserDTO, AdminDeleteChatDTO, ChatRightsDTO } from 'src/models/admin.models';
import { DeleteChatDTO } from 'src/models/chat.admin.models';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Role } from './Role/role.enum';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>, 
    @InjectRepository(ChatEntity) private ChatRepo: Repository<ChatEntity>,
	@InjectRepository(Chat_userEntity) private Chat_userRepo: Repository<Chat_userEntity>,
    ) {}

    async deleteChat(data: AdminDeleteChatDTO) {
        await getConnection()
				.createQueryBuilder()
				.delete()
				.from(Chat_userEntity)
				.where("chatId = :chatId", {chatId: data.chatId})
				.execute();
		ChatEntity.delete(data.chatId);
        return true;
    }

    async banUser(data: AdminBanUserDTO) {
        const user = await this.userRepo.findOne(data.userId);
       if (user.role == Role.Admin)
            return false;
       user.isBan = true;
       await user.save();
       return true;
    }

    async unbanUser(data: AdminBanUserDTO) {
        const user = await this.userRepo.findOne(data.userId);
        user.isBan = false;
        await user.save();
        return true;
    }

    async giveChatRights(data: ChatRightsDTO) {
        const chat_user = await getRepository(Chat_userEntity)
		.createQueryBuilder("chat_user")
		.where("chat_user.userId = :userId", {userId: data.userId})
        .andWhere("chat_user.chatId = :chatId", {chatId: data.chatId})
		.getOne();
        if (chat_user == undefined || chat_user.adminlvl == 1)
            return false;
        chat_user.adminlvl = 2;
        await chat_user.save();
        return true;
    }

    async removeChatRights (data: ChatRightsDTO) {
        const chat_user = await getRepository(Chat_userEntity)
        .createQueryBuilder("chat_user")
        .where("chat_user.userId = :userId", {userId: data.userId})
        .andWhere("chat_user.chatId = :chatId", {chatId: data.chatId})
        .getOne();
        if (chat_user == undefined || chat_user.adminlvl == 1)
            return false;
        chat_user.adminlvl = 1;
        await chat_user.save();
        return true;
    }

    async giveAdminRights(data: AdminBanUserDTO, adminLogin: string) {
        const user = await this.userRepo.findOne(data.userId);
        if (adminLogin != "blorin" && adminLogin != "smorel")
            return false;
        user.role = Role.Admin;
        user.save();
        return true;
    }

    async removeAdminRights(data: AdminBanUserDTO, adminLogin: string) {
        const user = await this.userRepo.findOne(data.userId);
        if (adminLogin != "blorin" && adminLogin != "smorel")
            return false;
        if (user.login == "blorin" || user.login == "smorel")
            return false;
        user.role = Role.User;
        user.save();
        return true;
    }
}

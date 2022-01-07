import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat_userEntity } from 'src/entities/chat-user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { UserEntity } from 'src/entities/user.entity';
import { BanUserDTO, DeleteChatDTO, MuteUserDTO, SetAdminDTO } from 'src/models/chat.admin.models';
import { getConnection, getRepository, Repository } from 'typeorm';
import { getSystemErrorMap } from 'util';

enum AdminLvl {
	owner = 1,
	admin,
	user,
}
@Injectable()
export class ChatAdminService {
	constructor(
		@InjectRepository(ChatEntity) private ChatRepo: Repository<ChatEntity>,
		@InjectRepository(Chat_userEntity) private Chat_userRepo: Repository<Chat_userEntity>,
		@InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>,
	) {}

	async setAdmin(adminInfo: SetAdminDTO) {
		try {
			const chat = await this.ChatRepo.findOne(adminInfo.chatId);
			if (chat == undefined)
				throw new ConflictException('chat doesnt exist');
			if (chat.ownerId != adminInfo.ownerId)
				throw new UnauthorizedException('No permission to set user as admin');
			const chat_user = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: adminInfo.adminId})
			.andWhere("chat_user.chatId = :chatId", {chatId: adminInfo.chatId})
			.getOne();
			if (chat_user == undefined)
				throw new ConflictException('User not in chat');
			if (chat_user.adminlvl <= 2)
				throw new ConflictException('User already an admin');
			chat_user.adminlvl = 2;
			await chat_user.save();
			return chat_user;
		} catch (error) {
			return error;
		}
	}

	async removeAdmin(adminInfo: SetAdminDTO) {
		try {
			const chat = await this.ChatRepo.findOne(adminInfo.chatId);
			if (chat.ownerId != adminInfo.ownerId)
				throw new UnauthorizedException('No permission to set user as admin');
			const chat_user = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: adminInfo.adminId})
			.andWhere("chat_user.chatId = :chatId", {chatId: adminInfo.chatId})
			.getOne();
			if (chat_user == undefined)
				throw new ConflictException('User not in chat');
			if (chat_user.adminlvl > 2)
				throw new ConflictException('User is not an admin');
			chat_user.adminlvl = 3;
			await chat_user.save();
			return chat_user;
		} catch (error) {
			return error;
		}
	}

	async banUser(banInfo: BanUserDTO) {
		try {
			const target = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: banInfo.targetId})
			.andWhere("chat_user.chatId = :chatId", {chatId: banInfo.chatId})
			.getOne();
		
			const admin = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: banInfo.adminId})
			.andWhere("chat_user.chatId = :chatId", {chatId: banInfo.chatId})
			.getOne();
			if (admin == undefined || target == undefined)	
				throw new ConflictException('Admin or target not in chat');
			if (target.banned == true)
				throw new ConflictException('Target already banned');
			if (admin.adminlvl < target.adminlvl)
			{
				target.banned = true;
				await target.save();
				return target;
			}
			else
				throw new UnauthorizedException('insufisant right to ban user');
		} catch (error) {
			return error;
		}
	}

	async unbanUser(banInfo: BanUserDTO) {
		try {
			const target = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: banInfo.targetId})
			.andWhere("chat_user.chatId = :chatId", {chatId: banInfo.chatId})
			.getOne();
		
			const admin = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: banInfo.adminId})
			.andWhere("chat_user.chatId = :chatId", {chatId: banInfo.chatId})
			.getOne();
			if (admin == undefined || target == undefined)	
				throw new ConflictException('Admin or target not in chat');
			if (target.banned == false)
				throw new ConflictException('Target already unbanned');
			if (admin.adminlvl < target.adminlvl)
			{
				target.banned = false;
				await target.save();
				return target;
			}
			else
				throw new UnauthorizedException('insufisant right to unban user');
		} catch (error) {
			return error;
		}
	}

	async muteUser(muteInfo: MuteUserDTO) {
		try {
			const target = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: muteInfo.targetId})
			.andWhere("chat_user.chatId = :chatId", {chatId: muteInfo.chatId})
			.getOne();
			const admin = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: muteInfo.adminId})
			.andWhere("chat_user.chatId = :chatId", {chatId: muteInfo.chatId})
			.getOne();
			if (admin == undefined || target == undefined)	
				throw new ConflictException('Admin or target not in chat');
			if (target.muted == true)
				throw new ConflictException('Target already muted');
			if (admin.adminlvl < target.adminlvl)
			{
				target.muted = true;
				await target.save();
				return target;
			}
			else
				throw new UnauthorizedException('insufisant right to mute user');
		} catch (error) {
			return error;
		}
	}

	async unmuteUser(muteInfo: MuteUserDTO) {
		try {
			const target = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: muteInfo.targetId})
			.andWhere("chat_user.chatId = :chatId", {chatId: muteInfo.chatId})
			.getOne();
			const admin = await getRepository(Chat_userEntity)
			.createQueryBuilder("chat_user")
			.where("chat_user.userId = :userId", {userId: muteInfo.adminId})
			.andWhere("chat_user.chatId = :chatId", {chatId: muteInfo.chatId})
			.getOne();
			if (admin == undefined || target == undefined)	
				throw new ConflictException('Admin or target not in chat');
			if (target.muted == false)
				throw new ConflictException('Target already unmuted');
			if (admin.adminlvl < target.adminlvl)
			{
				target.muted = false;
				await target.save();
				return target;
			}
			else
				throw new UnauthorizedException('insufisant right to unmute user');
		} catch (error) {
			return error;
		}
	}

	async deleteChat(chatInfo: DeleteChatDTO) {
		try {
			const user = await this.UserRepo.findOne(chatInfo.userId);
			const chat = await this.ChatRepo.findOne(chatInfo.chatId);
			if (!user || !chat)
				throw new ConflictException('User or chat doesnt exist');
			if (chat.ownerId != chatInfo.userId)
				throw new UnauthorizedException('insufisant right to delete user');
			await getConnection()
				.createQueryBuilder()
				.delete()
				.from(Chat_userEntity)
				.where("chatId = :chatId", {chatId: chatInfo.chatId})
				.execute();
			ChatEntity.delete(chatInfo.chatId);
			return true;
		}
		catch (error) {
			return error;
		}
	}

	async getAdminInfo(chatId: number) {
		try {
			const chat = await this.ChatRepo.findOne(chatId);
			if (!chat)
				throw new ConflictException('Chat doesnt exist');
			const admin = await getRepository(Chat_userEntity)
			.createQueryBuilder("admin")
			.where("admin.chatId = :chatId", {chatId: chatId})
			.getMany();
			return admin;
		} catch (error) {
			return error;
		}
	}
}

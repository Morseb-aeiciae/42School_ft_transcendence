import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockEntity } from 'src/entities/block.entity';
import { Chat_userEntity } from 'src/entities/chat-user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AddMessageDTO, addUserToChatDTO, BlockUserDTO, ChatDTO, DirectChatDTO, FindBlockedUsersDTO, FindMessageDTO } from 'src/models/chat.models';
import { getConnection, getRepository, In, Repository } from 'typeorm';

enum chat_protection {
	public = 1,
	private_wo_pwd,
	private_with_pwd,
}

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(ChatEntity) private ChatRepo: Repository<ChatEntity>,
		@InjectRepository(Chat_userEntity) private Chat_userRepo: Repository<Chat_userEntity>,
		@InjectRepository(MessageEntity) private MessageRepo: Repository<MessageEntity>,
		@InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>,
		@InjectRepository(BlockEntity) private BlockRepo: Repository<BlockEntity>,
	) {}

	async createChat(chatInfo: ChatDTO) {
		const chat = this.ChatRepo.create(chatInfo);
		if (chatInfo.password != undefined)
			chat.protection = chat_protection.private_with_pwd;
		else 
			chat.protection = chat_protection.public;
		chat.owner = await this.UserRepo.findOne(chatInfo.ownerId);
		await chat.save();
		this.addUserToChat(chatInfo.ownerId, chat.id, chatInfo.password, 1);
		return chat;
	}

	async createDirectChat(chatInfo: DirectChatDTO) {
		const user1 = await this.UserRepo.findOne(chatInfo.userId_1);
		const user2 = await this.UserRepo.findOne(chatInfo.userId_2);
		const chat = this.ChatRepo.create({name: user1.username + "_" + user2.username});
		this.addUserToChat(user1.id, chat.id);
		this.addUserToChat(user2.id, chat.id);
		chat.protection = chat_protection.private_wo_pwd;
		await chat.save();
		return chat;
	}

	async updatePassword(passwordInfo: addUserToChatDTO) {
		try {
			const chat = await this.ChatRepo.findOne(passwordInfo.chatId);
		const user = await this.UserRepo.findOne(passwordInfo.userId);
		if (chat.owner.username != user.username)
			throw new UnauthorizedException("Not authorized to change password");
		chat.password = passwordInfo.password;
		if (chat.password.length == 0)
			chat.protection = chat_protection.public;
		return chat;
		} catch (error) {
			return error;
		}
	}

	async addUserToChat(userId: number, chatId: number, password?: string, adminlvl?: number) {
		try {
			const user = await this.UserRepo.findOne(userId);
			const chat = await this.ChatRepo.findOne(chatId);
			if (user == undefined || chat == undefined)
				throw new UnauthorizedException("Chat or user undefined");
			if (chat.protection == chat_protection.private_wo_pwd) {
				throw new UnauthorizedException("Can't add user to chat");
			}
			if (chat.protection == chat_protection.private_with_pwd)
			{
				if (password == undefined)
					throw new UnauthorizedException("invalid credentials");
				const isValid: boolean = await chat.comparePassword(password);
				if (isValid == false)
					throw new UnauthorizedException("invalid credentials");
			}
			const chat_user = this.Chat_userRepo.create();
			chat_user.user = user;
			chat_user.chat = chat;
			if (adminlvl == 1)
				chat_user.adminlvl = adminlvl;
			chat_user.save();
			return chat_user;
		} catch (error) {
			return error;
		}
	}

	async getUsersOfChat(id: number) {
		const users = await getRepository(Chat_userEntity)
		.createQueryBuilder("chat_user")
		.where("chat_user.chatId = :id", {id: id})
		.getMany();

		if (users.length == 0)
		{
			const err = await getRepository(UserEntity)
			.createQueryBuilder("chat")
			.where("chat.id  = :id", {id: 98547})
			.getMany();
			return err;
		}
		let i : number = 0;
		let arr:number[] = [];
		while (i < users.length) {
			arr[i] = users[i].userId;
			i++;
		}

		const userArray = await getRepository(UserEntity)
		.createQueryBuilder("user")
		.where("user.id IN (:...ids)", {ids: arr,})
		.getMany();
		return userArray;
	}

	async getChatById(id: number) {
		const chat = this.ChatRepo.findOne(id);
		return chat;
	}

	async getChatsOfUser(id: number) {
		const chats = await getRepository(Chat_userEntity)
		.createQueryBuilder("chat_user")
		.where("chat_user.userId = :id", {id: id})
		.getMany();

		let i : number = 0;
		let arr:number[] = [];

		if (chats.length == 0)
		{
			const err = await getRepository(ChatEntity)
			.createQueryBuilder("user")
			.where("user.id  = :id", {id: 98547})
			.getMany();
			return err;
		}
		while (i < chats.length) {
			arr[i] = chats[i].chatId;
			i++;
		}

		const chatArray = await getRepository(ChatEntity)
		.createQueryBuilder("chat")
		.where("chat.id IN (:...ids)", {ids: arr,})
		.getMany();
		return chatArray;
	}

	async addMessage(msg_info: AddMessageDTO) {
	try {
		const chat = await this.ChatRepo.findOne(msg_info.chatId);
		const user = await this.UserRepo.findOne(msg_info.userId);
		if (chat == undefined || user == undefined)
			throw new ConflictException("Chat or user undefined");
		const msg = this.MessageRepo.create(msg_info);
		await msg.save();
		return msg;
	} catch (error) {
		return error;
	}
	}

	async getMessages(chatId: number, userId: number) { 
		const message = await getRepository(MessageEntity)
		.createQueryBuilder("message")
		.where("message.userId = :userId", {userId: userId})
		.andWhere("message.chatId = :chatId", {chatId: chatId})
		.getMany();
		return message;
	}

	async isUserOnChat(info: FindMessageDTO) {
		const chat_user = await getRepository(Chat_userEntity)
		.createQueryBuilder("chat_user")
		.where("chat_user.userId = :userId", {userId: info.userId})
		.andWhere("chat_user.chatId = :chatId", {chatId: info.chatId})
		.getMany();
		if (chat_user.length == 0)
			return false;
		else
			return true;
	}

	async blockUser(blockInfo: BlockUserDTO) {
		try {
			const target = await this.UserRepo.findOne(blockInfo.targetId);
			const blocker = await this.UserRepo.findOne(blockInfo.blockerId);
			if ((blockInfo.targetId == blockInfo.blockerId) || !target || !blocker)
				throw new ConflictException("Error with target or blocker id");
			const isBlocked = await getRepository(BlockEntity)
			.createQueryBuilder("block")
			.where("block.blockerId = :blockerId", {blockerId: blockInfo.blockerId})
			.andWhere("block.targetId = :targetId", {targetId: blockInfo.targetId})
			.getOne();
			if	(isBlocked != undefined)
				throw new ConflictException("User already blocked");
			const block = this.BlockRepo.create(blockInfo);
			await block.save();
			return block;
		} catch (error) {
			return error;
		}
	}

	async getBlockedUsers(userId: number) {
		try {
			const user = await this.UserRepo.findOne(userId);
			if (!user)
				throw new ConflictException("Error with user id");
			const block = await getRepository(BlockEntity)
			.createQueryBuilder("block")
			.where("block.blockerId = :userId", {userId: userId})
			.getMany();
	
			if (block.length == 0)
			{
				const err = await getRepository(UserEntity)
				.createQueryBuilder("user")
				.where("user.id  = :id", {id: 98547})
				.getMany();
				return err;
			}
			let i : number = 0;
			let arr:number[] = [];
			while (i < block.length) {
				arr[i] = block[i].targetId;
				i++;
			}
	
			const blockArray = await getRepository(UserEntity)
			.createQueryBuilder("users")
			.where("users.id IN (:...ids)", {ids: arr,})
			.getMany();
			return blockArray;
		} catch (error) {
			return error;
		}
	}

	async unblockUser(blockInfo: BlockUserDTO) {
		try {
			const isBlocked = await getRepository(BlockEntity)
			.createQueryBuilder("block")
			.where("block.blockerId = :blockerId", {blockerId: blockInfo.blockerId})
			.andWhere("block.targetId = :targetId", {targetId: blockInfo.targetId})
			.getOne();
			if	(isBlocked == undefined)
				throw new ConflictException("User already unblocked");
			await getConnection()
			.createQueryBuilder()
			.delete()
			.from(BlockEntity)
			.where("targetId = :targetId", {targetId: blockInfo.targetId})
			.andWhere("blockerId = :blockerId", {blockerId: blockInfo.blockerId})
			.execute();
			return "succesfully deleted";
		} catch (error) {
			return error;
		}
	}

	async getChatList() {
		const chats = await getRepository(ChatEntity)
		.createQueryBuilder("chats")
		.where("chats.protection = :protectionP", {protectionP: chat_protection.private_with_pwd})
		.orWhere("chats.protection = :protection", {protection: chat_protection.public})
		.getMany();
		return chats;
	}

	async leaveChat(chatInfo: FindMessageDTO) {
		try {
			const user = await this.UserRepo.findOne(chatInfo.userId);
			const chat = await this.ChatRepo.findOne(chatInfo.chatId);
			if (!user || !chat)
				throw new ConflictException('User or chat doesnt exist');
			if (user.id == chat.ownerId)
				throw new ConflictException('Owner cant leave chat');
			if (await this.isUserOnChat(chatInfo))
			{
				await getConnection()
				.createQueryBuilder()
				.delete()
				.from(Chat_userEntity)
				.where("chatId = :chatId", {chatId: chatInfo.chatId})
				.andWhere("userId = :userId", {userId: chatInfo.userId})
				.execute();
				return true;
			}
			else
				throw new ConflictException('User not in chat');
		} catch (error) {
			return error;
		}
	}

	async getMessageOfChat(chatId: number) {
		try {
			const chat = await this.ChatRepo.findOne(chatId);
			if (!chat)
				throw new ConflictException('chat doesnt exist');
			const msg = await getRepository(MessageEntity)
			.createQueryBuilder("msg")
			.where("msg.chatId = :id", {id: chatId})
			.getMany()
			
			return msg;
		
		} catch (error) {
			return error;
		}
	}
}

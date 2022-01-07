import { Body, Controller, createParamDecorator, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/admin/Role/role.enum';
import { Roles } from 'src/admin/Role/roles.decorator';
import RoleGuard from 'src/admin/Role/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AddMessageDTO, addUserToChatDTO, BlockUserDTO, ChatDTO, DirectChatDTO, FindMessageDTO } from 'src/models/chat.models';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
	constructor(private ChatService: ChatService, ) {}


	@Get("getAllChats")
	async getAllChats() {
		return this.ChatService.getAllChats();
	}
	
	@Post('createChat')
	async createChat(@Body(ValidationPipe) chatInfo: ChatDTO) {
		return this.ChatService.createChat(chatInfo);
	}

	@Get("getUsersOfChat/:id")
	async getUsersOfChat(@Param("id") id: number) {
		return this.ChatService.getUsersOfChat(id);
	}

	@Post("addUserToChat")
	async addUserToChat(@Body(ValidationPipe) info: addUserToChatDTO) {
		return this.ChatService.addUserToChat(info.userId, info.chatId, info.password);
	}

	@Get("getChat/:id")
	async getChat(@Param("id") id: number) {
		return this.ChatService.getChatById(id);
	}

	@Get("getChatsOfUser/:id")
	async getChatsOfUser(@Param("id") id:number) {
		return this.ChatService.getChatsOfUser(id);
	}

	@Post("getMessages")
	async getMessages(@Body(ValidationPipe) info: FindMessageDTO) {
		return this.ChatService.getMessages(info.chatId, info.userId);
	}

	@Post("addMessage")
	async addMessages(@Body(ValidationPipe) info: AddMessageDTO) {
		return this.ChatService.addMessage(info);
	}

	@Post("isUserOnChat")
	async isUserOnChat(@Body(ValidationPipe) info: FindMessageDTO) {
		return this.ChatService.isUserOnChat(info);
	}

	@Post("createDirectChat")
	async createDirectChat(@Body(ValidationPipe) info: DirectChatDTO) {
		return this.ChatService.createDirectChat(info);
	}

	@Post("updatePassword")
	async updatePassword(@Body(ValidationPipe) info: addUserToChatDTO) {
		return this.ChatService.updatePassword(info);
	}

	@Post("blockUser")
	async blockUser(@Body(ValidationPipe) blockInfo: BlockUserDTO) {
		return this.ChatService.blockUser(blockInfo);
	}

	@Get("getBlockedUsers/:id")
	async getBlockedUsers(@Param("id")id: number) {
		return this.ChatService.getBlockedUsers(id);
	}

	@Post("unblockUser")
	async unlockUser(@Body(ValidationPipe) blockInfo: BlockUserDTO) {
		return this.ChatService.unblockUser(blockInfo);
	}

	@Get("getChatList")
	async getChatList() {
		return this.ChatService.getChatList();
	}

	@Post("leaveChat")
	async leaveChat(@Body(ValidationPipe) chatInfo: FindMessageDTO) {
		return this.ChatService.leaveChat(chatInfo);
	}

	@Get("getMessageOfChat/:id")
	async getMessageOfChat(@Param(("id")) id:number) {
		return this.ChatService.getMessageOfChat(id);
	}

	@Post("getDirectChat")
	async getDirectChat(@Body(ValidationPipe) data: DirectChatDTO) {
		return this.ChatService.getDirectChat(data);
	}
}

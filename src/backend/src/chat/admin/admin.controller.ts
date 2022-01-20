import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt.TwoAuth.guard';
import { BanUserDTO, DeleteChatDTO, SetAdminDTO } from 'src/models/chat.admin.models';
import { ChatAdminService } from './admin.service';

@Controller('chat/admin')
@UseGuards(JwtTwoFactorGuard)
export class ChatAdminController {
	constructor(private AdminService: ChatAdminService) {}

	@Post('setAdmin')
	async setAdmin(@Body(ValidationPipe) adminInfo: SetAdminDTO) {
		return this.AdminService.setAdmin(adminInfo);
	}

	@Post('removeAdmin')
	async removeAdmin(@Body(ValidationPipe) adminInfo: SetAdminDTO) {
		return this.AdminService.removeAdmin(adminInfo);
	}

	@Post('banUser')
	async banUser(@Body(ValidationPipe) banInfo: BanUserDTO) {
		return this.AdminService.banUser(banInfo);
	}

	@Post('unbanUser')
	async unbanUser(@Body(ValidationPipe) banInfo: BanUserDTO) {
		return this.AdminService.unbanUser(banInfo);
	}

	@Post('muteUser')
	async muteUser(@Body(ValidationPipe) banInfo: BanUserDTO) {
		return this.AdminService.muteUser(banInfo);
	}

	@Post('unmuteUser')
	async  unmuteUser(@Body(ValidationPipe) banInfo: BanUserDTO) {
		return this.AdminService.unmuteUser(banInfo);
	}

	@Post("deleteChat")
	async deleteChat(@Body(ValidationPipe) chatInfo: DeleteChatDTO) {
		return this.AdminService.deleteChat(chatInfo);
	}

	@Get("getAdminInfo/:id")
	async getAdminInfo(@Param("id")id: number) {
		return this.AdminService.getAdminInfo(id);
	}
}

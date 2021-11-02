import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { BanUserDTO, SetAdminDTO } from 'src/models/chat.admin.models';
import { AdminService } from './admin.service';

@Controller('chat/admin')
export class AdminController {
	constructor(private AdminService: AdminService) {}

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
}

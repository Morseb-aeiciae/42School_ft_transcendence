import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import JwtTwoFactorGuard from 'src/auth/guard/jwt.TwoAuth.guard';
import {
  AdminBanUserDTO,
  AdminDeleteChatDTO,
  ChatRightsDTO,
} from 'src/models/admin.models';
import { BanUserDTO, DeleteChatDTO } from 'src/models/chat.admin.models';
import { AdminService } from './admin.service';
import { Role } from './Role/role.enum';
import RoleGuard from './Role/roles.guard';

@UseGuards(RoleGuard(Role.Admin))
@UseGuards(JwtTwoFactorGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('deleteChat')
  async deleteChat(@Body(ValidationPipe) data: AdminDeleteChatDTO) {
    return this.adminService.deleteChat(data);
  }

  @Post('banUser')
  async banUser(@Body(ValidationPipe) data: AdminBanUserDTO) {
    return this.adminService.banUser(data);
  }

  @Post('unbanUser')
  async unbanUser(@Body(ValidationPipe) data: AdminBanUserDTO) {
    return this.adminService.unbanUser(data);
  }

  // @Post("giveChatRights")
  // async giveChatRights(@Body(ValidationPipe) data: ChatRightsDTO) {
  //     return this.adminService.giveChatRights(data);
  // }

  // @Post("removeChatRights")
  // async removeChatRights(@Body(ValidationPipe) data: ChatRightsDTO) {
  //     return this.adminService.removeChatRights(data);
  // }

  @Post('removeAdminRights')
  async removeAdminRights(
    @Body(ValidationPipe) data: AdminBanUserDTO,
    @Req() req,
  ) {
    return this.adminService.removeAdminRights(data, req.user.login);
  }

  @Post('giveAdminRights')
  async giveAdminRights(
    @Body(ValidationPipe) data: AdminBanUserDTO,
    @Req() req,
  ) {
    return this.adminService.giveAdminRights(data, req.user.login);
  }
}

import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import JwtTwoFactorGuard from 'src/auth/guard/jwt.TwoAuth.guard';
import { SendFriendInviteDTO } from 'src/models/friends.models';
import { FriendsService } from './friends.service';

@UseGuards(JwtTwoFactorGuard)
@Controller('friends')
export class FriendsController {

    constructor(private FriendsService: FriendsService) {}

    @Post("sendFriendInvite")
    async sendFriendInvite(@Body(ValidationPipe) data: SendFriendInviteDTO) {
        return this.FriendsService.sendFriendInvite(data);
    }

    @Post("isFriends")
    async isFriends(@Body(ValidationPipe)data: SendFriendInviteDTO) {
        return this.FriendsService.isFriends(data);
    }

    @Get("getListOfFriends/:id")
    async getListOfFriends(@Param("id") id: number) {
        return this.FriendsService.getListOfFriends(id);
    }

    @Post("removeFriends")
    async removeFriend(@Body(ValidationPipe) data: SendFriendInviteDTO) {
        return this.FriendsService.removeFriend(data);
    }
}

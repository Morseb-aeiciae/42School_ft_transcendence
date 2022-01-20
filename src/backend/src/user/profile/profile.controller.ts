import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt.TwoAuth.guard';
import { UserService } from '../user.service';


@Controller('profiles')
@UseGuards(JwtTwoFactorGuard)
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  async findProfile(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    return { profile: user };
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}

import { UserService } from './user.service';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { AuthGuard } from 'src/auth/strategy';
import { EditUserDto } from './dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@User('') user): ReturnType<typeof this.userService.getUser> {
    const userId: number = user?.userId;
    const email: string = user?.email;
    return this.userService.getUser(userId, email);
  }

  @Patch('me')
  editUser(
    @User('userId') userId,
    @Body() newValues: EditUserDto,
  ): ReturnType<typeof this.userService.editUser> {
    return this.userService.editUser(userId, newValues);
  }
}

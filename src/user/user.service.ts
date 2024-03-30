import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number, email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        email,
      },
    });
    delete user.password;
    return user;
  }

  async editUser(userId: number, newValues: EditUserDto): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...newValues },
    });
    delete updatedUser.password;
    return updatedUser;
  }
}

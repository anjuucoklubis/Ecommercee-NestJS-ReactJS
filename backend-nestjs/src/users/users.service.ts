import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        createdAt: true,
        updateAt: true,
        UserRole: true,
        userprofile: true,
        useraddress: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const decodedUser = req.user as { id: string; email: string };

    if (user.id !== decodedUser.id) {
      throw new ForbiddenException();
    }

    delete user.hashedPassword;

    return { user };
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updateAt: true,
        UserRole: true,
        userprofile: true,
        useraddress: true,
      },
    });
  }

  async getProfile(req: Request) {
    const decodedUser = req.user as { id: string; email: string };

    const user = await this.prisma.user.findUnique({
      where: { id: decodedUser.id },
      include: {
        userprofile: true,
        useraddress: true,
        UserRole: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.hashedPassword;

    return { user };
  }

  findOne(id: string) {
    console.log('Searching for user with ID:', id);
    return this.prisma.user
      .findUnique({
        where: {
          id: id,
        },
        include: {
          userprofile: true,
          useraddress: true,
          UserRole: true,
        },
      })
      .then((user) => {
        console.log('User found:', user);
        if (user) {
          delete user.hashedPassword;
        }
        return user;
      })
      .catch((error) => {
        console.error('Error finding user:', error);
        throw error;
      });
  }

  async resetPassword(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const defaultPassword = 'default';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: { hashedPassword },
    });

    return { message: `Password with id ${id} has been reset to default` };
  }

  async deleteAccountUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: `User Account ${id} successfully deleted` };
  }
}

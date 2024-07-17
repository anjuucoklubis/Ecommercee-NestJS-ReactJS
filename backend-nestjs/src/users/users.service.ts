import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({ where: { id } });

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
      select: { id: true, email: true },
    });
  }

  async getProfile(req: Request) {
    const decodedUser = req.user as { id: string; email: string };

    const user = await this.prisma.user.findUnique({
      where: { id: decodedUser.id },
      include: {
        userprofile: true,
        useraddress: true,
        UserRole:true
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.hashedPassword;

    return { user };
  }
}

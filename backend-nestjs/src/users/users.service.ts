import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateUserPersonalRequest,
  UpdateUserPersonalRequest,
} from 'src/model/auth.model';
import {
  CreateUserAddressRequest,
  UpdateUserAddressRequest,
} from 'src/model/UserAddress.model';
import { PrismaService } from 'src/Prisma/prisma.service';
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
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.hashedPassword;

    return { user };
  }

  async createProfile(userId: string, data: CreateUserPersonalRequest) {
    const { firstname, lastname, telephone } = data;

    return this.prisma.userprofile.create({
      data: {
        firstname,
        lastname,
        telephone,
        userId: userId,
      },
    });
  }
  async updateProfile(userId: string, data: UpdateUserPersonalRequest) {
    const { firstname, lastname, telephone } = data;

    return this.prisma.userprofile.update({
      where: { userId },
      data: {
        firstname,
        lastname,
        telephone,
      },
    });
  }

  async createAddress(userId: string, data: CreateUserAddressRequest) {
    const { address_line, postal_code, city, province, country } = data;

    return this.prisma.useraddress.create({
      data: {
        address_line,
        postal_code,
        city,
        province,
        country,
        userId: userId,
      },
    });
  }

  async updateAddress(addressId: string, data: UpdateUserAddressRequest) {
    const { address_line, postal_code, city, province, country } = data;

    try {
      const updatedAddress = await this.prisma.useraddress.update({
        where: { id: addressId },
        data: {
          address_line,
          postal_code,
          city,
          province,
          country,
        },
      });
      return updatedAddress;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }
}

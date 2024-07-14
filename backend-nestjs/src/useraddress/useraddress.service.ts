import {
  CreateUserAddressRequest,
  UpdateUserAddressRequest,
} from 'src/model/useraddress.model';
import { PrismaService } from 'src/Prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class UseraddressService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async createAddress(userId: string, data: CreateUserAddressRequest) {
    const {
      full_name,
      number_phone,
      province,
      city,
      postal_code,
      address_line,
      houseOroffice,
    } = data;

    return this.prisma.useraddress.create({
      data: {
        full_name,
        number_phone,
        province,
        city,
        postal_code,
        address_line,
        houseOroffice,
        userId: userId,
      },
    });
  }

  async updateAddress(addressId: string, data: UpdateUserAddressRequest) {
    const {
      full_name,
      number_phone,
      province,
      city,
      postal_code,
      address_line,
      houseOroffice,
    } = data;

    try {
      const updatedAddress = await this.prisma.useraddress.update({
        where: { id: addressId },
        data: {
          full_name,
          number_phone,
          province,
          city,
          postal_code,
          address_line,
          houseOroffice,
        },
      });
      return updatedAddress;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }

  async deleteAddress(id: string) {
    const address = await this.prisma.useraddress.findUnique({
      where: { id: id },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await this.prisma.useraddress.delete({
      where: { id: id },
    });
  }
}

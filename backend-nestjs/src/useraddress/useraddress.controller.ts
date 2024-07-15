import {
  Req,
  Res,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateUserAddressRequest,
  UpdateUserAddressRequest,
  UserAddressResponse,
} from 'src/model/useraddress.model';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UseraddressService } from './useraddress.service';

@ApiTags('My Account - User Address')
@Controller('useraddress')
export class UseraddressController {
  constructor(private readonly useraddressService: UseraddressService) {}
  @UseGuards(JwtAuthGuard)
  @Post('address-create')
  async createAddress(
    @Req() req,
    @Body() addressData: CreateUserAddressRequest,
  ): Promise<UserAddressResponse> {
    const userId = req.user.id;
    const createAddress = await this.useraddressService.createAddress(
      userId,
      addressData,
    );
    return {
      id: createAddress.id,
      full_name: createAddress.full_name,
      number_phone: createAddress.number_phone,
      province: createAddress.province,
      city: createAddress.city,
      postal_code: createAddress.postal_code,
      address_line: createAddress.address_line,
      houseOroffice: createAddress.province,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('address-update/:id')
  async updateAddress(
    @Param('id') addressId: string,
    @Body() addressData: UpdateUserAddressRequest,
  ) {
    const updatedAddress = await this.useraddressService.updateAddress(
      addressId,
      addressData,
    );
    return {
      id: updatedAddress.id,
      full_name: updatedAddress.full_name,
      number_phone: updatedAddress.number_phone,
      province: updatedAddress.province,
      city: updatedAddress.city,
      postal_code: updatedAddress.postal_code,
      address_line: updatedAddress.address_line,
      houseOroffice: updatedAddress.houseOroffice,
    };
  }

  @Delete('address-delete/:id')
  async deleteAddress(@Param('id') id: string, @Res() response) {
    try {
      await this.useraddressService.deleteAddress(id);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Address deleted successfully' });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting address',
        error: error.message,
      });
    }
  }
}

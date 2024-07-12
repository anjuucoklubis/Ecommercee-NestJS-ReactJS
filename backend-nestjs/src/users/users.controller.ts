import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserPersonalRequest,
  CreateUserPersonalResponse,
  UpdateUserPersonalRequest,
} from 'src/model/auth.model';
import {
  CreateUserAddressRequest,
  CreateUserAddressResponse,
  UpdateUserAddressRequest,
} from 'src/model/UserAddress.model';

@ApiTags('User Get All & by Id')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async createProfile(
    @Req() req,
    @Body() profileData: CreateUserPersonalRequest,
  ): Promise<CreateUserPersonalResponse> {
    const userId = req.user.id;
    const createdProfile = await this.usersService.createProfile(
      userId,
      profileData,
    );
    return {
      id: createdProfile.id,
      firstname: createdProfile.firstname,
      lastname: createdProfile.lastname,
      telephone: createdProfile.telephone,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Req() req,
    @Body() profileData: UpdateUserPersonalRequest,
  ) {
    const userId = req.user.id;
    return this.usersService.updateProfile(userId, profileData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('address')
  async createAddress(
    @Req() req,
    @Body() addressData: CreateUserAddressRequest,
  ): Promise<CreateUserAddressResponse> {
    const userId = req.user.id;
    const createAddress = await this.usersService.createAddress(
      userId,
      addressData,
    );
    return {
      id: createAddress.id,
      address_line: createAddress.address_line,
      postal_code: createAddress.postal_code,
      city: createAddress.city,
      province: createAddress.province,
      country: createAddress.country,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('address/:id')
  async updateAddress(
    @Param('id') addressId: string,
    @Body() addressData: UpdateUserAddressRequest,
  ) {
    const updatedAddress = await this.usersService.updateAddress(
      addressId,
      addressData,
    );
    return {
      id: updatedAddress.id,
      address_line: updatedAddress.address_line,
      postal_code: updatedAddress.postal_code,
      city: updatedAddress.city,
      province: updatedAddress.province,
      country: updatedAddress.country,
    };
  }
}

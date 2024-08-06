import {
  Req,
  Body,
  Post,
  Patch,
  HttpCode,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';

import {
  CreateUserProfileRequest,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from 'src/model/userprofile.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserprofileService } from './userprofile.service';
import { UnauthorizedResponse } from 'src/model/categoryproduct.model';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('My Account - User Profile')
@Controller('userprofile')
export class UserprofileController {
  constructor(private readonly userprofileService: UserprofileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile-create')
  @ApiOkResponse({
    description: 'OK',
    type: UserProfileResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async createProfile(
    @Req() req,
    @Body() request: CreateUserProfileRequest,
  ): Promise<UserProfileResponse> {
    const userId = req.user.id;
    try {
      const result = await this.userprofileService.createProfile(
        userId,
        request,
      );
      return result;
    } catch (error) {
      throw new Error('Failed to create user profile: ' + error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile-update')
  @ApiOkResponse({
    description: 'OK',
    type: UserProfileResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async updateProfile(
    @Req() req,
    @Body() request: UpdateUserProfileRequest,
  ): Promise<UserProfileResponse> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = req.user.id;
    try {
      if (
        request.firstname ||
        request.lastname ||
        request.birthday ||
        request.gender ||
        request.telephone ||
        request.image
      ) {
        const updatedProduct = await this.userprofileService.updateProfile(
          userId,
          request,
        );
        return {
          id: updatedProduct.id,
          firstname: updatedProduct.firstname,
          lastname: updatedProduct.lastname,
          birthday: updatedProduct.birthday,
          gender: updatedProduct.gender,
          telephone: updatedProduct.telephone,
          image: updatedProduct.image,
        } as UserProfileResponse;
      } else {
        throw new Error('No valid data provided for update');
      }
    } catch (error) {
      throw new Error('Failed to update user profile: ' + error.message);
    }
  }
}

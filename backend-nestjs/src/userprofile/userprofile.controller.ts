import {
  Req,
  Res,
  Get,
  Body,
  Post,
  Patch,
  Param,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  UnauthorizedException,
} from '@nestjs/common';

import { join } from 'path';
import {
  CreateUserProfileRequest,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from 'src/model/userprofile.model';
import { Observable, of } from 'rxjs';
import { existsSync, unlinkSync } from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserprofileService } from './userprofile.service';
import { StorageUploadUserProfile } from 'src/utils/storage-upload';
import { UnauthorizedResponse } from 'src/model/categoryproduct.model';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

const MAX_IMAGE_UPLOAD = 5 * 1024 * 1024;

@ApiTags('My Account - User Profile')
@Controller('userprofile')
export class UserprofileController {
  constructor(private readonly userprofileService: UserprofileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile-create')
  @UseInterceptors(FileInterceptor('image', StorageUploadUserProfile))
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
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|png)/ })
        .addMaxSizeValidator({ maxSize: MAX_IMAGE_UPLOAD })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() request: CreateUserProfileRequest,
  ): Promise<UserProfileResponse> {
    const userId = req.user.id;
    try {
      if (!file || !file.filename) {
        throw new Error('No image file uploaded');
      }
      request.image = file.filename;
      const result = await this.userprofileService.createProfile(
        userId,
        file,
        request,
      );
      return result;
    } catch (error) {
      throw new Error('Failed to create category product: ' + error.message);
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
  @UseInterceptors(FileInterceptor('image', StorageUploadUserProfile))
  async updateProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() request: UpdateUserProfileRequest,
  ): Promise<UserProfileResponse> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = req.user.id;
    try {
      const currentUserProfile =
        await this.userprofileService.getProfileByIdForUpdate(userId);

      if (file && file.filename) {
        const oldImagePath = `./public/img/userprofile/${currentUserProfile.image}`;
        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
          console.log(`Deleted old image file: ${oldImagePath}`);
        } else {
          console.log(`File not found: ${oldImagePath}`);
        }
        request.image = file.filename;
      }

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

  @Get('profile-image/:imageName')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Get user profile image',
  })
  getProfileImage(
    @Param('imageName') imageName,
    @Res() res,
  ): Observable<string> {
    return of(
      res.sendFile(join(process.cwd(), 'public/img/userprofile/' + imageName)),
    );
  }
}

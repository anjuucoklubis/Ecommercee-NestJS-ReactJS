import {
  CreateUserProfileRequest,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from 'src/model/userprofile.model';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/Prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProfileValidation } from './userprofile.validation';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class UserprofileService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}
  async createProfile(
    userId: string,
    file: Express.Multer.File,
    request: CreateUserProfileRequest,
  ): Promise<UserProfileResponse> {
    try {
      if (!file || !file.filename) {
        throw new BadRequestException('No image file uploaded');
      }
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Uploaded file is not an image');
      }

      const createUserPersonalRequest: CreateUserProfileRequest =
        this.validationService.validate(UserProfileValidation.CREATE, request);

      const createUserProfile = await this.prisma.userprofile.create({
        data: {
          ...createUserPersonalRequest,
          image: file.filename,
          user: {
            connect: { id: userId },
          },
        },
      });

      const response: UserProfileResponse = {
        id: createUserProfile.id,
        firstname: createUserProfile.firstname,
        lastname: createUserProfile.lastname,
        gender: createUserProfile.gender,
        birthday: createUserProfile.birthday,
        telephone: createUserProfile.telephone,
        image: createUserProfile.image,
      };

      return response;
    } catch (error) {
      throw new Error('Failed to create profile: ' + error.message);
    }
  }

  async getProfileByIdForUpdate(userId: string) {
    return this.prisma.userprofile.findUnique({
      where: { userId },
    });
  }

  async updateProfile(
    userId: string,
    request: UpdateUserProfileRequest,
  ): Promise<UserProfileResponse> {
    try {
      const updateUserPersonalRequest: UpdateUserProfileRequest =
        this.validationService.validate(UserProfileValidation.UPDATE, request);

      const updatedData: Partial<Prisma.UserprofileUpdateInput> = {};
      if (updateUserPersonalRequest.firstname) {
        updatedData.firstname = updateUserPersonalRequest.firstname;
      }
      if (updateUserPersonalRequest.lastname) {
        updatedData.lastname = updateUserPersonalRequest.lastname;
      }
      if (updateUserPersonalRequest.gender) {
        updatedData.gender = updateUserPersonalRequest.gender;
      }
      if (updateUserPersonalRequest.birthday) {
        updatedData.birthday = updateUserPersonalRequest.birthday;
      }
      if (updateUserPersonalRequest.telephone) {
        updatedData.telephone = updateUserPersonalRequest.telephone;
      }
      if (updateUserPersonalRequest.image) {
        updatedData.image = updateUserPersonalRequest.image;
      }

      if (Object.keys(updatedData).length > 0) {
        return await this.prisma.userprofile.update({
          where: {
            userId: userId,
          },
          data: updatedData,
        });
      } else {
        throw new Error('Nothing to update');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new Error('Validation failed: ' + error.message);
      } else {
        throw new Error('Failed to update profile');
      }
    }
  }
}

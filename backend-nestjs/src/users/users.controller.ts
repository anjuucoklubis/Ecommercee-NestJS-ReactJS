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
}

import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';
import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';

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

  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('reset-password/:id')
  async resetPassword(@Param('id') id: string) {
    return this.usersService.resetPassword(id);
  }
}

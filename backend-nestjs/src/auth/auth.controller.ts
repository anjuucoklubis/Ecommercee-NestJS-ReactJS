import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { AuthDtoModel } from 'src/model/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDtoModel) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDtoModel, @Req() req, @Res() res) {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protected(@Req() req, @Res() res) {
    return this.authService.protected(req, res);
  }
}

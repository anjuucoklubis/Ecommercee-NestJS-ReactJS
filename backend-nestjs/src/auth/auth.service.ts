import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';
import { AuthDtoModel, changePasswordModel } from 'src/model/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDtoModel) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const pembeliRole = await this.prisma.userRole.findUnique({
      where: { role_name: 'PEMBELI' },
    });

    if (!pembeliRole) {
      throw new BadRequestException('Role PEMBELI not found');
    }

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
        userRoleId: pembeliRole.id,
      },
    });

    return { message: 'signup was successful' };
  }

  async signin(dto: AuthDtoModel, req: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      throw new BadRequestException('Wrong Cridentials ');
    }

    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!isMatch) {
      throw new BadRequestException('Wrong Cridentials ');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);

    return res.send({ message: 'logged in successfully' });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'logged out successfully' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;
    console.log('Signing token with secret:', jwtSecret);
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }

  async protected(req: Request, res: Response) {
    try {
      return res.status(200).json({
        info: 'Protected info',
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async changePassword(request: changePasswordModel, userId: string) {
    const { oldPassword, newPassword } = request;

    const foundUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await this.comparePasswords({
      password: oldPassword,
      hash: foundUser.hashedPassword,
    });

    if (!isMatch) {
      throw new BadRequestException('Wrong old password');
    }

    const hashedNewPassword = await this.hashPassword(newPassword);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedPassword: hashedNewPassword },
    });

    return { message: 'Password changed successfully' };
  }
}

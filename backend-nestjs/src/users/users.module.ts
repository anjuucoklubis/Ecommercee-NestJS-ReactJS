import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ValidationService } from 'src/common/validation.service';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy, ValidationService],
})
export class UsersModule {}

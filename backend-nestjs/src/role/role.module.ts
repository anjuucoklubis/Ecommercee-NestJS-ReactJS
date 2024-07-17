import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [RoleService, PrismaService, ValidationService, JwtStrategy],
})
export class RoleModule {}

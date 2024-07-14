import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { UseraddressService } from './useraddress.service';
import { PrismaService } from 'src/Prisma/prisma.service';
import { UseraddressController } from './useraddress.controller';
import { ValidationService } from 'src/common/validation.service';

@Module({
  providers: [
    UseraddressService,
    ValidationService,
    JwtStrategy,
    PrismaService,
  ],
  imports: [PrismaModule],
  controllers: [UseraddressController],
})
export class UseraddressModule {}

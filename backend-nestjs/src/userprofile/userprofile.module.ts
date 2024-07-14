import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { PrismaService } from 'src/Prisma/prisma.service';
import { UserprofileService } from './userprofile.service';
import { UserprofileController } from './userprofile.controller';
import { ValidationService } from 'src/common/validation.service';

@Module({
  providers: [
    JwtStrategy,
    PrismaService,
    ValidationService,
    UserprofileService,
  ],
  imports: [PrismaModule],
  controllers: [UserprofileController],
})
export class UserprofileModule {}

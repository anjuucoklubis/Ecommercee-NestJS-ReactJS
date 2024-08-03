import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CarouselService } from './carousel.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CarouselController } from './carousel.controller';
import { ValidationService } from 'src/common/validation.service';

@Module({
  imports: [PrismaModule],
  controllers: [CarouselController],
  providers: [CarouselService, PrismaService, JwtStrategy, ValidationService],
})
export class CarauselModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { DiscountproductService } from './discountproduct.service';
import { DiscountproductController } from './discountproduct.controller';

@Module({
  imports: [PrismaModule],
  providers: [DiscountproductService, PrismaService, ValidationService],
  controllers: [DiscountproductController],
})
export class DiscountproductModule {}

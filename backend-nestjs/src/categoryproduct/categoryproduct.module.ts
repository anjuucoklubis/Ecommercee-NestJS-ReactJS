import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { CategoryproductService } from './categoryproduct.service';
import { CategoryproductController } from './categoryproduct.controller';

@Module({
  imports: [PrismaModule],
  providers: [CategoryproductService, PrismaService, ValidationService],
  controllers: [CategoryproductController],
})
export class CategoryproductModule {}

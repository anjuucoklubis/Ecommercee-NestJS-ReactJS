import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';

@Module({
  imports: [PrismaModule],
  providers: [ProductService, PrismaService, ValidationService],
  controllers: [ProductController],
})
export class ProductModule {}

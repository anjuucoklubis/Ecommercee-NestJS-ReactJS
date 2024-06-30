import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CategoryproductModule } from './categoryproduct/categoryproduct.module';
import { DiscountproductController } from './discountproduct/discountproduct.controller';
import { DiscountproductService } from './discountproduct/discountproduct.service';
import { DiscountproductModule } from './discountproduct/discountproduct.module';
import { PrismaService } from './Prisma/prisma.service';
import { ValidationService } from './common/validation.service';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';

@Module({
  imports: [CategoryproductModule, DiscountproductModule, ProductModule],
  controllers: [AppController, DiscountproductController, ProductController],
  providers: [
    AppService,
    DiscountproductService,
    ProductService,
    PrismaService,
    ValidationService,
  ],
})
export class AppModule {}

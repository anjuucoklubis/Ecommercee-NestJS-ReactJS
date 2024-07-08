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
import { GaleriesproductController } from './product/galeriesproduct/galeriesproduct.controller';
import { GaleriesproductService } from './product/galeriesproduct/galeriesproduct.service';
import { GaleriesproductModule } from './product/galeriesproduct/galeriesproduct.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CategoryproductModule,
    DiscountproductModule,
    ProductModule,
    GaleriesproductModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    DiscountproductController,
    ProductController,
    GaleriesproductController,
  ],
  providers: [
    AppService,
    DiscountproductService,
    ProductService,
    PrismaService,
    ValidationService,
    GaleriesproductService,
  ],
})
export class AppModule {}

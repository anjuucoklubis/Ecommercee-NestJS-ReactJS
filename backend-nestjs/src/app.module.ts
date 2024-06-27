import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CategoryproductModule } from './categoryproduct/categoryproduct.module';
import { DiscountproductController } from './discountproduct/discountproduct.controller';
import { DiscountproductService } from './discountproduct/discountproduct.service';
import { DiscountproductModule } from './discountproduct/discountproduct.module';
import { PrismaService } from './Prisma/prisma.service';
import { ValidationService } from './common/validation.service';

@Module({
  imports: [CategoryproductModule, DiscountproductModule],
  controllers: [AppController, DiscountproductController],
  providers: [
    AppService,
    DiscountproductService,
    PrismaService,
    ValidationService,
  ],
})
export class AppModule {}

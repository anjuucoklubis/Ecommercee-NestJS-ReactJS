import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { GaleriesproductService } from './galeriesproduct.service';
import { GaleriesproductController } from './galeriesproduct.controller';

@Module({
  imports: [PrismaModule],
  controllers: [GaleriesproductController],
  providers: [GaleriesproductService, PrismaService, ValidationService],
})
export class GaleriesproductModule {}

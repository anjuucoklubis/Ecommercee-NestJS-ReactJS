import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { MasterlocationService } from './masterlocation.service';
import { MasterlocationController } from './masterlocation.controller';

@Module({
  imports: [PrismaModule],
  providers: [MasterlocationService],
  controllers: [MasterlocationController],
})
export class MasterlocationModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CategoryproductModule } from './categoryproduct/categoryproduct.module';

@Module({
  imports: [CategoryproductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

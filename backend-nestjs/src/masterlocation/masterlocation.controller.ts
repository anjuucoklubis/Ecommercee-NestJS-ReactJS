import { ApiTags } from '@nestjs/swagger';
import { MasterlocationService } from './masterlocation.service';
import { Controller, Get, Logger, Param, ParseIntPipe } from '@nestjs/common';

@ApiTags('01-Master Location City ')
@Controller('masterlocation')
export class MasterlocationController {
  private readonly logger = new Logger(MasterlocationController.name);

  constructor(private readonly masterlocationService: MasterlocationService) {}

  @Get('province')
  findAllProvince() {
    return this.masterlocationService.findAllProvince();
  }

  @Get('city/:id')
  async getCitiesByProvinceId(@Param('id', ParseIntPipe) id: number) {
    return this.masterlocationService.getCitiesByProvinceId(id);
  }
}

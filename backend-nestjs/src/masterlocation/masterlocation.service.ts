import { PrismaService } from 'src/Prisma/prisma.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MasterlocationService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
  ) {}

  findAllCity() {
    return this.prisma.mastercity.findMany();
  }

  findAllProvince() {
    return this.prisma.masterprovince.findMany();
  }

  async getCitiesByProvinceId(provinceId: number) {
    return this.prisma.mastercity.findMany({
      where: {
        province_id: provinceId,
      },
    });
  }
}

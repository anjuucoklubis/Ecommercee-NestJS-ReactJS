import { Test, TestingModule } from '@nestjs/testing';
import { GaleriesproductService } from './galeriesproduct.service';

describe('GaleriesproductService', () => {
  let service: GaleriesproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GaleriesproductService],
    }).compile();

    service = module.get<GaleriesproductService>(GaleriesproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

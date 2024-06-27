import { Test, TestingModule } from '@nestjs/testing';
import { DiscountproductService } from './discountproduct.service';

describe('DiscountproductService', () => {
  let service: DiscountproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountproductService],
    }).compile();

    service = module.get<DiscountproductService>(DiscountproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DiscountproductController } from './discountproduct.controller';

describe('DiscountproductController', () => {
  let controller: DiscountproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountproductController],
    }).compile();

    controller = module.get<DiscountproductController>(DiscountproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

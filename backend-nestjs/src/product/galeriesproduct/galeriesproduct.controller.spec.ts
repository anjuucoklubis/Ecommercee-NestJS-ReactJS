import { Test, TestingModule } from '@nestjs/testing';
import { GaleriesproductController } from './galeriesproduct.controller';

describe('GaleriesproductController', () => {
  let controller: GaleriesproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaleriesproductController],
    }).compile();

    controller = module.get<GaleriesproductController>(GaleriesproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CategoryproductController } from './categoryproduct.controller';

describe('CategoryproductController', () => {
  let controller: CategoryproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryproductController],
    }).compile();

    controller = module.get<CategoryproductController>(
      CategoryproductController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

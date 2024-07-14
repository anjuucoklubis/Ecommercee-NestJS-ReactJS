import { Test, TestingModule } from '@nestjs/testing';
import { MasterlocationController } from './masterlocation.controller';
import { MasterlocationService } from './masterlocation.service';

describe('MasterlocationController', () => {
  let controller: MasterlocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterlocationController],
      providers: [MasterlocationService],
    }).compile();

    controller = module.get<MasterlocationController>(MasterlocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

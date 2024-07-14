import { Test, TestingModule } from '@nestjs/testing';
import { MasterlocationService } from './masterlocation.service';

describe('MasterlocationService', () => {
  let service: MasterlocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterlocationService],
    }).compile();

    service = module.get<MasterlocationService>(MasterlocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

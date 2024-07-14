import { Test, TestingModule } from '@nestjs/testing';
import { UseraddressService } from './useraddress.service';

describe('UseraddressService', () => {
  let service: UseraddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseraddressService],
    }).compile();

    service = module.get<UseraddressService>(UseraddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

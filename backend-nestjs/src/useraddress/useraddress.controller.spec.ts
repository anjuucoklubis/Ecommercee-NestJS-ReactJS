import { Test, TestingModule } from '@nestjs/testing';
import { UseraddressController } from './useraddress.controller';
import { UseraddressService } from './useraddress.service';

describe('UseraddressController', () => {
  let controller: UseraddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseraddressController],
      providers: [UseraddressService],
    }).compile();

    controller = module.get<UseraddressController>(UseraddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

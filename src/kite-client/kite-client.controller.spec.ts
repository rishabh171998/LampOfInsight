import { Test, TestingModule } from '@nestjs/testing';
import { KiteClientController } from './kite-client.controller';

describe('KiteClientController', () => {
  let controller: KiteClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KiteClientController],
    }).compile();

    controller = module.get<KiteClientController>(KiteClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

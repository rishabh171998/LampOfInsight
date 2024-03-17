import { Test, TestingModule } from '@nestjs/testing';
import { KiteConnectPoolService } from './kite-connect-pool.service';

describe('KiteConnectPoolService', () => {
  let service: KiteConnectPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KiteConnectPoolService],
    }).compile();

    service = module.get<KiteConnectPoolService>(KiteConnectPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

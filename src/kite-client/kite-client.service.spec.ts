import { Test, TestingModule } from '@nestjs/testing';
import { KiteClientService } from './kite-client.service';

describe('KiteClientService', () => {
  let service: KiteClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KiteClientService],
    }).compile();

    service = module.get<KiteClientService>(KiteClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

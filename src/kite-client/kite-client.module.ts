import { Module } from '@nestjs/common';
import { KiteClientController } from './kite-client.controller';
import { KiteClientService } from './kite-client.service';
import { KiteConnectPoolService } from 'src/kite-connect-pool/kite-connect-pool.service';

@Module({
  controllers: [KiteClientController],
  providers: [KiteClientService, KiteConnectPoolService]
})
export class KiteClientModule {}

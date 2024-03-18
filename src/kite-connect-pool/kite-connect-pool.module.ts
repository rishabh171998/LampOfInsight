import { Module } from '@nestjs/common';
import { KiteConnectPoolService } from './kite-connect-pool.service';

@Module({
  providers: [KiteConnectPoolService]
})
export class KiteConnectPoolModule {}

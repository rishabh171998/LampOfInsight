import { Module } from '@nestjs/common';
import { KiteClientController } from './kite-client.controller';
import { KiteClientService } from './kite-client.service';

@Module({
  controllers: [KiteClientController],
  providers: [KiteClientService]
})
export class KiteClientModule {}

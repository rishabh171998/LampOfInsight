import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KiteClientModule } from './kite-client/kite-client.module';
import { KiteConnectPoolModule } from './kite-connect-pool/kite-connect-pool.module';

@Module({
  imports: [KiteClientModule, KiteConnectPoolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

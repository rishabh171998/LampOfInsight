import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KiteClientModule } from './kite-client/kite-client.module';

@Module({
  imports: [KiteClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

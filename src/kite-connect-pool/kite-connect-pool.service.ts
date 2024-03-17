import { Injectable } from '@nestjs/common';
import { KiteConnect } from 'kiteconnect';
import { createKiteConnectClient } from './kite-connect-factory';

@Injectable()
export class KiteConnectPoolService {
  private kiteClients: Map<string, KiteConnect> = new Map();

  constructor() {}

  async getClient(userId: string): Promise<KiteConnect> {
    let kiteClient = this.kiteClients.get(userId);

    if (!kiteClient) {
      kiteClient = createKiteConnectClient();
      this.kiteClients.set(userId, kiteClient);
    }

    return kiteClient;
  }

  async setClient (userId: string , kiteConnectClient : KiteConnect): Promise<void> 
  {
    this.kiteClients.set(userId , kiteConnectClient)
  }
 
  // Add methods for releasing clients, handling expiration, etc.
}

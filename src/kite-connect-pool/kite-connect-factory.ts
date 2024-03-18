// kite-connect.factory.ts

import { KiteConnect } from 'kiteconnect';
import * as dotenv from 'dotenv';

dotenv.config();



export function createKiteConnectClient(): KiteConnect {
  const kiteClient = new KiteConnect({ api_key:  process.env.KITE_API_KEY });
  // Additional configuration or setup if needed
  return kiteClient;
}

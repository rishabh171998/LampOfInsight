import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { KiteConnectPoolService } from 'src/kite-connect-pool/kite-connect-pool.service';
import { createKiteConnectClient } from 'src/kite-connect-pool/kite-connect-factory';

dotenv.config();

@Injectable()
export class KiteClientService {
  constructor(private readonly kiteConnectPool: KiteConnectPoolService) {}

  async initiateLogin(redirectURL: string): Promise<string> {
    try {
      const loginUrl = `https://kite.zerodha.com/connect/login?v=3&api_key=${process.env.KITE_API_KEY}&redirect_params=${encodeURIComponent('redirect_url=' + redirectURL)}`;
      return loginUrl;
    } catch (error) {
      // Handle or log error appropriately
      throw error;
    }
  }

  async generate(requestToken: string, apiSecret: string): Promise<any> {
    try {
      const response = await this.createAndSetKiteConnectClient(requestToken, apiSecret);
      return response;
    } catch (error) {
      console.error('Error occurred during session generation:', error);
      throw error;
    }
  }
  
  async createAndSetKiteConnectClient(requestToken: string, apiSecret: string): Promise<any> {
    const kite = createKiteConnectClient();
    const response = await kite.generateSession(requestToken, apiSecret);
    
    console.log(response);
    const { user_id, access_token } = response;
    kite.setAccessToken(access_token);
    
    await this.kiteConnectPool.setClient(user_id, kite);
    
    return response;
  }

  async getProfile(userId: string ,accessToken: string): Promise<any> {
    try {
      const kiteClient = await this.kiteConnectPool.getClient(userId)
      const response = await kiteClient.getProfile(accessToken);
      return response;
    } catch (error) {
      // Handle or log error appropriately
      throw error;
    }
  }

  async logout(userId: string, accessToken: string): Promise<any> {
    try {
      const kiteClient = await this.kiteConnectPool.getClient(userId)
      const response = await kiteClient.delete('/session/token', { access_token: accessToken });
      return response;
    } catch (error) {
      // Handle or log error appropriately
      throw error;
    }
  }

  async getMargins(userId: string , accessToken: string, segment?: string): Promise<any> {
    try {
      const kiteClient = await this.kiteConnectPool.getClient(userId)
      const response = await kiteClient.getMargins({ access_token: accessToken, segment });
      return response;
    } catch (error) {
      // Handle or log error appropriate
      throw error;
    }
  }

  async getHistoricalData(instrumentToken: string, interval: string, fromDate: string, toDate: string , userId: string): Promise<any> {
    try {
      const kiteClient = await this.kiteConnectPool.getClient(userId)
      console.log(kiteClient);
      const instrumentToken = "256265"; // e.g., '256265' for NIFTY 50
const fromDate = "2024-02-01"; // Start date in YYYY-MM-DD format
const toDate = "2024-02-10"; // End date in YYYY-MM-DD format
const interval = "day"; // Could be "3minute", "5minute", "day" etc.
      const response = await kiteClient.getHistoricalData(instrumentToken, interval, fromDate, toDate, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

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
   
  async getAllInstruments(userId: string, segments?: string[]): Promise<any[]> {
    try {
      console.log("entered Get Instruments Service")
      const kiteClient= await this.kiteConnectPool.getClient(userId);
      console.log(kiteClient)
      const response = await kiteClient.getInstruments(segments);
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async getInstruments(userId: string): Promise<any[]> {
    try {
      console.log("entered Get Instruments Service")
      const kiteClient= await this.kiteConnectPool.getClient(userId);
      console.log(kiteClient)
      const response = await kiteClient.getInstruments();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
  async getHistoricalData(
    instrumentToken: string,
    interval: string,
    fromDate: string,
    toDate: string,
    userId: string,
    continuous: boolean = false // Optional parameter with default value
  ): Promise<any[]> {
    try {
      console.log("entered Get Historical Service Controller")
      const kiteClient = await this.kiteConnectPool.getClient(userId);
      console.log(kiteClient);
      const response = await kiteClient.getHistoricalData(
        instrumentToken,
        interval,
        fromDate,
        toDate,
        continuous
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

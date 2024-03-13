import { Injectable } from '@nestjs/common';
import { KiteConnect } from 'kiteconnect';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class KiteClientService {
  private kite: KiteConnect;

  constructor() {
    this.kite = new KiteConnect({
      api_key: process.env.KITE_API_KEY,
    });
  }

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
        console.log(this.kite);
      const response = await this.kite.generateSession(requestToken, apiSecret)
      return response;
    } catch (error) {
      console.log(error);
        throw error;

    }
  }

  async getProfile(accessToken: string): Promise<any> {
    try {
      const response = await this.kite.getProfile(accessToken);
      return response;
    } catch (error) {
      // Handle or log error appropriately
      throw error;
    }
  }

  async logout(accessToken: string): Promise<any> {
    try {
      const response = await this.kite.delete('/session/token', { access_token: accessToken });
      return response;
    } catch (error) {
      // Handle or log error appropriately
      throw error;
    }
  }

  async getMargins(accessToken: string, segment?: string): Promise<any> {
    try {
      const response = await this.kite.getMargins({ access_token: accessToken, segment });
      return response;
    } catch (error) {
      // Handle or log error appropriately
      throw error;
    }
  }
}

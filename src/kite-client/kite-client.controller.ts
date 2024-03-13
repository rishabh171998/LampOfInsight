// src/kite-client/kite-client.controller.ts

import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { KiteClientService } from './kite-client.service';

@Controller('kite-client')
export class KiteClientController {
  constructor(private readonly kiteClientService: KiteClientService) {}

  @Get('login')
  async login(@Query('redirect_url') redirectUrl: string, @Res() res): Promise<any> {
    try {
      const loginUrl = await this.kiteClientService.initiateLogin(redirectUrl);
      return res.redirect(loginUrl);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  @Get('callback')
  async callback(@Query('request_token') requestToken: string, @Query('api_secret') apiSecret: string): Promise<any> {
    try {
      const response = await this.kiteClientService.generate(requestToken, apiSecret);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('profile')
  async getProfile(@Query('access_token') accessToken: string): Promise<any> {
    try {
      const response = await this.kiteClientService.getProfile(accessToken);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }
  @Get('logout')
  async logout(@Query('access_token') accessToken: string): Promise<any> {
    try {
      const response = await this.kiteClientService.logout(accessToken);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('margins')
  async getMargins(@Query('access_token') accessToken: string, @Query('segment') segment?: string): Promise<any> {
    try {
      const response = await this.kiteClientService.getMargins(accessToken, segment);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }
}

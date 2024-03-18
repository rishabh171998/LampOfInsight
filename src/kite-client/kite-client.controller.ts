// src/kite-client/kite-client.controller.ts

import { Controller, Get, Query, Res, HttpStatus, Param } from '@nestjs/common';
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
  async getProfile(@Query('UserId') userId: string, @Query('access_token') accessToken: string): Promise<any> {
    try {
      const response = await this.kiteClientService.getProfile(userId, accessToken);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('instruments')
  async getInstruments(
    @Query('userId') userId: string,
    @Query('segment') segment: string[],
  ): Promise<any[]> {
    console.log(typeof(segment));
    console.log(segment);
    console.log("entered Get Instruments Controller")
    return this.kiteClientService.getAllInstruments(userId, segment);
  }

  
  @Get('GetAllInstruments')
  async getAllInstruments(
    @Query('userId') userId: string,
    @Query('segment') segment?: string[],
  ): Promise<any[]> {
    console.log(typeof(segment));
    console.log(segment);
    console.log("entered Get Instruments Controller")
    return this.kiteClientService.getInstruments(userId);
  }

  @Get(':instrumentToken')
  async getHistoricalData(
    @Param('instrumentToken') instrumentToken: string,
    @Query('interval') interval: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
    @Query('userId') userId: string,
    @Query('continuous') continuous?: boolean // Make it optional
  ): Promise<any> {
    // Validate interval, fromDate, toDate here if needed
    console.log("entered Get Historical Controller")
    return this.kiteClientService.getHistoricalData(
      instrumentToken,
      interval,
      fromDate,
      toDate,
      userId,
      continuous // Pass it to the service method
    );
  }



  @Get('logout')
  async logout(@Query('UserId') userId: string, @Query('access_token') accessToken: string): Promise<any> {
    try {
      const response = await this.kiteClientService.logout(userId, accessToken);
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

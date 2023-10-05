import { Controller, Get } from '@nestjs/common';
import { XCoinAPI } from './XCoinAPI';

@Controller('info')
export class CoinViewController {
  @Get('account')
  public async coinviewAccount(): Promise<any> {
    const key = process.env.API_KEY;
    const secret = process.env.API_SECRET;
    const rgParams = {
      order_currency: 'BTC',
      payment_currency: 'KRW',
    };

    const xcoinAPI = new XCoinAPI(key, secret);

    try {
      const data = await xcoinAPI.xcoinApiCall('/info/account', rgParams);
      return data.body;
    } catch (error) {
      throw error;
    }
  }
}

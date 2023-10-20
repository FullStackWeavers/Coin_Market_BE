import { Controller, Get, Headers } from '@nestjs/common';
import { XCoinAPI } from './XCoinAPI';

@Controller('info')
export class CoinViewController {
  @Get('account')
  public async coinviewAccount(@Headers('cookie') cookie): Promise<any> {
    console.log(cookie);
    const key = process.env.API_KEY;
    const secret = process.env.API_SECRET;
    const rgParams = {
      order_currency: 'BTC',
      payment_currency: 'KRW',
    };
    const coin = ['ETH', 'ETC', 'BTC'];
    const arr = [];
    const xcoinAPI = new XCoinAPI(key, secret);

    try {
      for (let i = 0; i < coin.length; i++) {
        rgParams.order_currency = coin[i];
        const data = await xcoinAPI.xcoinApiCall('/info/account', rgParams);
        arr.push(data.body);
      }
      console.log(arr);
    } catch (error) {
      throw error;
    }
  }
}

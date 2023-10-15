import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { XCoinAPI } from './XCoinAPI';
import { CoinViewService } from './coinview.service';
import { verify } from 'jsonwebtoken';

@Controller('info')
export class CoinViewController {
  constructor(private readonly coinViewService: CoinViewService) {}

  @Get('account')
  public async coinviewAccount(@Headers('cookie') cookie): Promise<any> {
    console.log(cookie);

    const key = process.env.API_KEY;
    const secret = process.env.API_SECRET;
    const rgParams = {
      order_currency: 'BTC',
      payment_currency: 'KRW',
    };

    const xcoinAPI = new XCoinAPI(key, secret);

    try {
      const data = await xcoinAPI.xcoinApiCall('/info/account', rgParams);
      console.log(data.body);
      return data.body;
    } catch (error) {
      throw error;
    }
  }

  @Post('userkey')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async userkeyPush(@Headers('cookie') cookie, @Body() data): Promise<any> {
    const cookies = cookie.split(';');

    let accessToken = null;

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

      if (name === 'accessToken') {
        accessToken = value;
        const decodedToken = verify(
          accessToken,
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
        );
        console.log('디코딩된 토큰 데이터:', decodedToken);
      }
    }
  }
}

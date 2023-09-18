import { Injectable } from '@nestjs/common';
import { XCoinAPI } from '../XCoinAPI';

@Injectable()
export class WalletAddressService {
  private api_key: string = process.env.API_KEY;
  private api_secret: string = process.env.API_SECRET;

  private xcoinAPI = new XCoinAPI(this.api_key, this.api_secret);
  private rgParams: { order_currency: string; payment_currency: string } = {
    order_currency: 'BTC',
    payment_currency: 'KRW',
  };

  main = async (): Promise<any> => {
    const res = await this.xcoinAPI.xcoinApiCall(
      '/info/wallet_address',
      this.rgParams,
    );
    return { message: '전송에 성공하였습니다', data: res.body };
  };
}

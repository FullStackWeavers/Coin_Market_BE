// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PortfolioService } from './portfolio.service';
import { XCoinAPI } from 'src/coinview/XCoinAPI';
import { Portfolio } from './entity/portfolio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly userService: UserService,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  @Post('apikey')
  async userkeyPush(@Headers('cookie') cookie, @Body() data): Promise<any> {
    try {
      const user: any = await this.userService.decodeToken(cookie);
      if (!user) {
        throw new Error('User not found.');
      }
      await this.portfolioService.getKeyFindUserAndKeySave(
        user.user.email,
        data.connectKey,
        data.secretKey,
      );
      return { success: true, message: 'API key saved successfully.' };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Internal Server Error.',
      };
    }
  }

  @Get('mylist')
  async getMyPortfolioList(
    @Headers('cookie') cookie: string,
    @Res() res,
  ): Promise<any> {
    try {
      const user: any = await this.userService.decodeToken(cookie);
      if (!user) {
        throw new Error('User not found.');
      }
      const portfolios = await this.portfolioRepository.find({
        where: {
          userId: user.user.id,
        },
      });
      const coins = portfolios.map((portfolio) => portfolio.coin);
      res.status(200).json(coins);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Internal Server Error.' });
    }
  }

  @Get('list/:coinName')
  async getCoinData(
    @Headers('cookie') cookie: string,
    @Param('coinName') coinName: string,
    @Res() res,
  ): Promise<any> {
    try {
      const user: any = await this.userService.decodeToken(cookie);
      if (
        !user ||
        !user.user ||
        !user.user.connectKey ||
        !user.user.secretKey
      ) {
        throw new Error('Invalid user or API keys.');
      }

      const rgParams = {
        order_currency: coinName,
        payment_currency: 'KRW',
      };

      const xcoinAPI = new XCoinAPI(user.user.connectKey, user.user.secretKey);

      const data = await xcoinAPI.xcoinApiCall('/info/account', rgParams);
      const parsedData = JSON.parse(data.body);
      res.json(parsedData);
    } catch (error) {}
  }

  @Post('create')
  async pushPortfolioCoin(
    @Headers('cookie') cookie: string,
    @Body() data: { selectedCoins: string[] },
  ): Promise<any> {
    try {
      const user: any = await this.userService.decodeToken(cookie);
      if (!user) {
        throw new Error('User not found.');
      }
      const userId = user.user.id;
      const promises = data.selectedCoins.map(async (coin: string) => {
        const portfolioDbCoin = await this.portfolioRepository.findOne({
          where: { coin },
        });
        if (!portfolioDbCoin) {
          const portfolio = new Portfolio();
          portfolio.userId = userId;
          portfolio.coin = coin;
          return await this.portfolioRepository.save(portfolio);
        }
      });
      const savedPortfolios = await Promise.all(promises);
      return savedPortfolios;
    } catch (error) {
      return { error: error.message || 'Internal Server Error.' };
    }
  }

  @Post('delete')
  async deletePortfolioCoin(
    @Headers('cookie') cookie: string,
    @Body() data: { coinName: string },
  ): Promise<any> {
    try {
      const user: any = await this.userService.decodeToken(cookie);
      if (!user || !data || !data.coinName) {
        throw new Error('Invalid request data.');
      }
      const portfolioDbCoin = await this.portfolioRepository.findOne({
        where: { userId: user.user.id, coin: data.coinName },
      });
      if (!portfolioDbCoin) {
        throw new Error('Portfolio coin not found.');
      }
      await this.portfolioRepository.delete(portfolioDbCoin.id);
      const portfolioData = await this.portfolioRepository.find({
        where: { userId: user.user.id },
      });
      return {
        data: portfolioData,
        success: true,
        message: 'Portfolio coin deleted successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Internal Server Error.',
      };
    }
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from './entity/coin.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Coin)
    private listCoinRepository: Repository<Coin>,
  ) {}

  async searchCoin(email: string, coinName: string) {
    const user = await this.userService.getUser(email);
    const coin = await this.listCoinRepository.find({
      where: { userId: user.id, coin: coinName },
    });
    return coin;
  }

  async viewCoin(email: string) {
    const user = await this.userService.getUser(email);
    const coin = await this.listCoinRepository.find({
      where: { userId: user.id },
    });
    const coins = coin.map((e) => {
      return e.coin;
    });
    return coins;
  }

  async createCoin(email: string, coinName: string) {
    const user = await this.userService.getUser(email);
    const coin = await this.searchCoin(email, coinName);
    if (coin.length == 0) {
      await this.listCoinRepository.save({ userId: user.id, coin: coinName });
      return { message: 'coin 추가완료!' };
    } else {
      return { message: 'coin이 이미 존재합니다.' };
    }
  }

  async deleteCoin(email: string, coinName: string) {
    const coin = await this.searchCoin(email, coinName);
    if (coin.length == 0) {
      return { message: '삭제할 코인이 존재하지 않습니다.' };
    } else {
      await this.listCoinRepository.delete(coin[0].id);
    }
  }

  async updateCoin(
    coin: string | any[],
    user: { user: { email: string } },
    data: { name: string },
  ) {
    if (coin.length == 0) {
      await this.createCoin(user.user.email, data.name);
      const coins = await this.viewCoin(user.user.email);
      return coins;
    } else {
      await this.deleteCoin(user.user.email, data.name);
      const coins = await this.viewCoin(user.user.email);
      return coins;
    }
  }
}

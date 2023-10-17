import { Module } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Coin } from './entity/coin.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Coin]), UserModule],
  controllers: [CoinController],
  providers: [CoinService],
})
export class CoinModule { }
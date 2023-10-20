import { Module } from '@nestjs/common';
import { CoinViewController } from './coinview.controller';
import { CoinViewService } from './coinview.service';
@Module({
  imports: [],
  providers: [CoinViewService],
  controllers: [CoinViewController],
})
export class BithumbModule {}

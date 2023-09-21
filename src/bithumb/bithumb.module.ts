import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { WalletAddressModule } from './wallet_address/wallet_address.module';
import { TickerModule } from './ticker/ticker.module';
import { BalanceService } from './balance/balance.service';
import { WalletAddressService } from './wallet_address/wallet_address.service';
import { TickerService } from './ticker/ticker.service';
import { BalanceController } from './balance/balance.controller';
import { WalletAddressController } from './wallet_address/wallet_address.controller';
import { TickerController } from './ticker/ticker.controller';

@Module({
  imports: [AccountModule, BalanceModule, WalletAddressModule, TickerModule],
  providers: [
    AccountService,
    BalanceService,
    WalletAddressService,
    TickerService,
  ],
  controllers: [
    AccountController,
    BalanceController,
    WalletAddressController,
    TickerController,
  ],
})
export class BithumbModule {}

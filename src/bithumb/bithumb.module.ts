import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { WalletAddressModule } from './wallet_address/wallet_address.module';
import { TickerModule } from './ticker/ticker.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { UserTransactionsModule } from './user_transactions/user_transactions.module';
import { BalanceService } from './balance/balance.service';
import { WalletAddressService } from './wallet_address/wallet_address.service';
import { TickerService } from './ticker/ticker.service';
import { OrdersService } from './orders/orders.service';
import { OrderDetailService } from './order_detail/order_detail.service';
import { UserTransactionsService } from './user_transactions/user_transactions.service';
import { BalanceController } from './balance/balance.controller';
import { WalletAddressController } from './wallet_address/wallet_address.controller';
import { TickerController } from './ticker/ticker.controller';
import { OrdersController } from './orders/orders.controller';
import { OrderDetailController } from './order_detail/order_detail.controller';
import { UserTransactionsController } from './user_transactions/user_transactions.controller';

@Module({
  imports: [
    AccountModule,
    BalanceModule,
    WalletAddressModule,
    TickerModule,
    OrdersModule,
    OrderDetailModule,
    UserTransactionsModule,
  ],
  providers: [
    AccountService,
    BalanceService,
    WalletAddressService,
    TickerService,
    OrdersService,
    OrderDetailService,
    UserTransactionsService,
  ],
  controllers: [
    AccountController,
    BalanceController,
    WalletAddressController,
    TickerController,
    OrdersController,
    OrderDetailController,
    UserTransactionsController,
  ],
})
export class BithumbModule {}

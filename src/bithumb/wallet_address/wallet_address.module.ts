import { Module } from '@nestjs/common';
import { WalletAddressService } from './wallet_address.service';
import { WalletAddressController } from './wallet_address.controller';

@Module({
  providers: [WalletAddressService],
  controllers: [WalletAddressController]
})
export class WalletAddressModule {}

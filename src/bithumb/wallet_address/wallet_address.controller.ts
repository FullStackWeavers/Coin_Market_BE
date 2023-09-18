import { Controller, Get } from '@nestjs/common';
import { WalletAddressService } from './wallet_address.service';

@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @Get()
  async getWalletAddress() {
    return await this.walletAddressService.main();
  }
}

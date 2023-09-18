import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getWalletAddress() {
    return await this.accountService.main();
  }
}

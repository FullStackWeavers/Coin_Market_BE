import { Controller, Get } from '@nestjs/common';
import { UserTransactionsService } from './user_transactions.service';

@Controller('user-transactions')
export class UserTransactionsController {
  constructor(
    private readonly userTransactionsService: UserTransactionsService,
  ) {}

  @Get()
  async getWalletAddress() {
    return await this.userTransactionsService.main();
  }
}

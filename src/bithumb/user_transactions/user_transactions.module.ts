import { Module } from '@nestjs/common';
import { UserTransactionsService } from './user_transactions.service';
import { UserTransactionsController } from './user_transactions.controller';

@Module({
  providers: [UserTransactionsService],
  controllers: [UserTransactionsController]
})
export class UserTransactionsModule {}

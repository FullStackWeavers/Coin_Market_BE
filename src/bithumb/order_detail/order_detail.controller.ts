import { Controller, Get } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  async getWalletAddress() {
    return await this.orderDetailService.main();
  }
}

import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CoinService } from './coin.service';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Controller('list')
export class CoinController {
    constructor(
        private readonly coinService: CoinService,
        private readonly userService: UserService
    ) { }

    @Post('checkCoin')
    async createBookmark(@Headers('cookie') cookie, @Body() data) {
        const user:any = await this.userService.decodeToken(cookie)
        const coin = await this.coinService.searchCoin(user.user.email, data.name);
        const list = this.coinService.check(coin, user, data)
        return list;
    }

    @Get('viewCoin')
    async viewCoin(@Headers('cookie') cookie) {
        const user:any = await this.userService.decodeToken(cookie)
        const coins = await this.coinService.viewCoin(user.user.email)
        return coins
    }
}

import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Controller('favorites')
export class FavoritesController {
    constructor(
        private readonly favoritesService: FavoritesService,
        private readonly userService: UserService
    ) { }

    @Get('checkCookie')
    async cookieCheck(@Headers('cookie') cookie) {
        if (cookie == undefined) {
            return false;
        } else {
            const user: any = await this.userService.decodeToken(cookie);
            const email = await this.userService.getUser(user.user.email);
            if(email){
                return true;
            }else{
                return false;
            }
        }
    }

    @Post('checkCoin')
    async createFavorites(@Headers('cookie') cookie, @Body() data) {
        const user:any = await this.userService.decodeToken(cookie)
        const coin = await this.favoritesService.searchCoin(user.user.email, data.name);
        const list = this.favoritesService.updateCoin(coin, user, data)
        return list;
    }

    @Get('viewCoin')
    async viewCoin(@Headers('cookie') cookie) {
        const user:any = await this.userService.decodeToken(cookie)
        const coins = await this.favoritesService.viewCoin(user.user.email)
        return coins
    }
}

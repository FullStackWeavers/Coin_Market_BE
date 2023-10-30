import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UserService } from 'src/user/user.service';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly userService: UserService,
  ) {}

  @Get('checkcookie')
  async cookieCheck(@Headers('cookie') cookie: string) {
    if (cookie == undefined) {
      return false;
    } else {
      const user: any = await this.userService.decodeToken(cookie);
      const email = await this.userService.getUser(user.user.email);
      if (email) {
        return console.log(email);;
      } else {
        return console.log(email);
      }
    }
  }

  @Post('checkcoin')
  async createFavorites(@Headers('cookie') cookie: string, @Body() data) {
    const user: any = await this.userService.decodeToken(cookie);
    const coin = await this.favoritesService.searchCoin(
      user.user.email,
      data.name,
    );
    const list = this.favoritesService.updateCoin(coin, user, data);
    return list;
  }

  @Get('viewcoin')
  async viewCoin(@Headers('cookie') cookie: string) {
    const user: any = await this.userService.decodeToken(cookie);
    const coins = await this.favoritesService.viewCoin(user.user.email);
    return coins;
  }
}

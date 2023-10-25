import { Controller, Get, Headers, Post, Res } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from './user.service';
interface UserPayload extends JwtPayload {
  user: {
    id: number;
    email: string;
  };
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('cookie')
  async getCookie(@Headers('cookie') cookie, @Res() res): Promise<any> {
    const cookies = cookie ? cookie.split(';') : [];
    let isCookie = false;

    for (const cookie of cookies) {
      const [name] = cookie.trim().split('=');
      if (name === 'accessToken') {
        isCookie = true;
        break;
      }
    }

    res.json({ isCookie });
  }

  @Post('userprofile')
  async userProfileGet(@Headers('cookie') cookie, @Res() res): Promise<any> {
    const cookies = cookie.split(';');

    let accessToken = null;

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

      if (name === 'accessToken') {
        accessToken = value;
        const decodedToken = verify(
          accessToken,
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
        );
        res.json({ decodedToken });
      }
    }
  }

  @Get('apikey')
  async getUserApiKey(@Headers('cookie') cookie, @Res() res): Promise<any> {
    const cookies = cookie.split(';');

    let accessToken = null;

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

      if (name === 'accessToken') {
        accessToken = value;
        const decodedToken: UserPayload = verify(
          accessToken,
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
        ) as UserPayload;
        if (decodedToken && decodedToken.user && decodedToken.user.email) {
          const email = await decodedToken.user.email;
          const user = await this.userService.getUser(email);
          res.json(user);
        }
      }
    }
  }
}

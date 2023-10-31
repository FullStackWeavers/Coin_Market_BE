/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Res, Headers } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from './user.service';
import dotenv from 'dotenv';
dotenv.config();

interface UserPayload extends JwtPayload {
  user: {
    id: number;
    email: string;
  };
}

let cookieData = null;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('cookie')
  async getCookie(@Headers('cookie') cookie: string, @Res() res): Promise<any> {
    console.log(`쿠키1${cookie}`);

    const cookies = cookie ? cookie.split(';') : [];
    // 저장된 쿠키 데이터를 전역 변수인 cookieData에 할당
    cookieData = cookies;
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
  async userProfileGet(@Res() res): Promise<any> {
    console.log(`쿠키2${cookieData}`);

    const cookies = cookieData;

    let accessToken = null;

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

      if (name === 'accessToken') {
        accessToken = value;
        try {
          const decodedToken = verify(
            accessToken,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
          );

          res.json({ decodedToken });
        } catch (error) {
          res.status(500).json({ error: 'Token verification failed.' });
        }
      }
    }
  }

  @Get('apikey')
  async getUserApiKey(
    @Headers('cookie') cookie: string,
    @Res() res,
  ): Promise<any> {
    const cookies = cookie.split(';');

    let accessToken = null;

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

      if (name === 'accessToken') {
        accessToken = value;
        try {
          const decodedToken: UserPayload = verify(
            accessToken,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
          ) as UserPayload;
          if (decodedToken && decodedToken.user && decodedToken.user.email) {
            const email = decodedToken.user.email;
            const user = await this.userService.getUser(email);
            res.json(user);
          }
        } catch (error) {
          console.error('Token verification error:', error);
          res.status(500).json({ error: 'Token verification failed.' });
        }
      }
    }
  }
}

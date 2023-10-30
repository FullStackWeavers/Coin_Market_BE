import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from './user.service';
import dotenv from 'dotenv';
import { Request } from 'express';
dotenv.config();

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
  async getCookie(@Req() req: Request, @Res() res): Promise<any> {
    const cookies = req.cookies ? req.cookies.split(';') : [];
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
  async userProfileGet(@Req() req: Request, @Res() res): Promise<any> {
    const cookies = req.cookies.split(';');

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
          console.error('Token verification error:', error);
          res.status(500).json({ error: 'Token verification failed.' });
        }
      }
    }
  }

  @Get('apikey')
  async getUserApiKey(@Req() req: Request, @Res() res): Promise<any> {
    const cookies = req.cookies.split(';');

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

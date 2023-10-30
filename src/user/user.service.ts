import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmailOrSave(email, photo): Promise<User> {
    const isUser = await this.getUser(email);
    if (!isUser) {
      const newUser = await this.userRepository.save({
        email,
        photo,
      });
      return newUser;
    }
    return isUser;
  }

  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async decodeToken(cookie: string) {
    console.log(cookie);
    console.log(cookie.split(';'));
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
        return decodedToken;
      }
    }
  }
}

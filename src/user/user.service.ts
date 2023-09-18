import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmailOrSave(email, username, providerId, photo): Promise<User> {
    try {
      const isUser = await this.getUser(email);
      if (!isUser) {
        const newUser = await this.userRepository.save({
          email,
          username,
          providerId,
          photo,
        });
        return newUser;
      }
      return isUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async googleLoginAPI(credential: string): Promise<string> {
    const decodeCredential = this.jwtService.decode(credential) as Record<
      string,
      string
    >;
    const { email, name, picture, sub } = decodeCredential;
    const user = await this.findByEmailOrSave(email, name, sub, picture);
    console.log(user);
    const payload = { user };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    console.log(user);
    return user;
  }
}

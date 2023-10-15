import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmailOrSave(email, photo): Promise<User> {
    try {
      const isUser = await this.getUser(email);
      if (!isUser) {
        const newUser = await this.userRepository.save({
          email,
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

  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }
}

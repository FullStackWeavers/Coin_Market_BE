import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async getKeyFindUserAndKeySave(
    email: string,
    connectKey: string,
    secretKey: string,
  ): Promise<User> {
    try {
      const options: FindOneOptions<User> = {
        where: { email: email },
      };
      const user = await this.userRepository.findOne(options);
      if (user) {
        user.connectKey = connectKey;
        user.secretKey = secretKey;
        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
      } else {
        const newUser = this.userRepository.create({
          email,
          connectKey,
          secretKey,
        });
        const savedUser = await this.userRepository.save(newUser);
        return savedUser;
      }
    } catch (err) {
      throw err;
    }
  }

  async getUser(email: string): Promise<User> {
    const user = await this.userService.getUser(email);
    return user;
  }
}

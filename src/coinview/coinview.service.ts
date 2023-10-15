import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoinViewService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getKeyFindUserAndKeySave(connectKey, secretKey): Promise<User> {
    try {
      if (connectKey) {
        const saveKey = await this.userRepository.save({
          connectKey,
          secretKey,
        });
        return saveKey;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

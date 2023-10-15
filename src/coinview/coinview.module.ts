import { Module } from '@nestjs/common';
import { CoinViewController } from './coinview.controller';
import { CoinViewService } from './coinview.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]), PassportModule],
  providers: [CoinViewService, UserService],
  controllers: [CoinViewController],
})
export class BithumbModule {}

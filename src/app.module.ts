import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { BithumbModule } from './coinview/coinview.module';
import { User } from './user/entity/user.entity';
import { ChatGateway } from './chat/chat.gateway';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    BithumbModule,
    CoinModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}

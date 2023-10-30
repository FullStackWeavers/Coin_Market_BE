import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BithumbModule } from './coinview/coinview.module';
import { User } from './user/entity/user.entity';
import { ChatGateway } from './chat/chat.gateway';
import { FavoritesModule } from './favorites/favorites.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
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
    FavoritesModule,
    PortfolioModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { GamesModule } from './games/games.module';

// test comment
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: `${process.env.POSTGRES_URL}`,
      username: `${process.env.POSTGRES_USER}`,
      password: `${process.env.POSTGRES_PASSWORD}`,
      database: `${process.env.POSTGRES_DB}`,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
    }),
    UsersModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

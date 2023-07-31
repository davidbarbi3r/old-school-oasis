import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, SteamStrategy } from './strategy';
import { CollectionService } from 'src/collection/collection.service';
import { CollectionModule } from 'src/collection/collection.module';

@Module({
  imports: [JwtModule.register({}), CollectionModule], // 👈 we customize it in the auth.service because we'll use a refresh token with a different configuration
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SteamStrategy, CollectionService],
})
export class AuthModule {}

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { Strategy } from 'passport-steam';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: config.get<string>('STEAM_API'),
    });
  }

  validate(identifier: string, profile: any) {
    const user = this.prisma.user.findUnique({
      where: {
        id: profile.id,
      },
    });

    if (!user) {
      this.prisma.user.create({
        data: {
          email: profile.email,
          userName: profile.username,
          authProvider: 'steam',
        },
      });
    }
    return user;
  }
}

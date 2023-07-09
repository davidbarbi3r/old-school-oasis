import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../prismaModule/prisma.service';

const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      clientID: config.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: config.get<string>('DISCORD_CLIENT_SECRET'),
      callbackURL: config.get<string>('DISCORD_CALLBACK_URL'),
      scope: scopes,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(profile);
    const user = await this.prisma.user.findUnique({
      where: {
        id: profile.id,
      },
    });

    if (!user) {
      await this.prisma.user.create({
        data: {
          email: profile.email,
          userName: profile.username,
          authProvider: 'discord',
        },
      });
    }

    return user;
  }
}

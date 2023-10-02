import { Injectable } from '@nestjs/common';
import { IIgdbAuth } from './types/igdb';
import { ConfigService } from '@nestjs/config';
import { Game } from '@prisma/client';

@Injectable()
export class IgdbService {
  constructor(private readonly config: ConfigService) {}

  igdbAuth: IIgdbAuth = {
    access_token: '',
    expires_in: 0,
    token_type: '',
  };

  async getIgdbAuth(): Promise<IIgdbAuth> {
    const twitchClientID = this.config.get<string>('TWITCH_CLIENT_ID');
    const twitchSecret = this.config.get<string>('TWITCH_SECRET');
    const auth = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${twitchClientID}&client_secret=${twitchSecret}&grant_type=client_credentials`,
      {
        method: 'POST',
      },
    );

    this.igdbAuth = await auth.json();
    return this.igdbAuth;
  }

  async searchIgdbGames(name: string) {
    if (!this.igdbAuth.access_token) {
      await this.getIgdbAuth();
    }

    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': this.config.get<string>('TWITCH_CLIENT_ID'),
        Authorization: `Bearer ${this.igdbAuth.access_token}`,
      },
      body: `search "${name}"; fields name, cover.url, platforms.name, first_release_date, websites.url, summary, storyline, genres.name, rating, screenshots.url; limit 1; `,
    });

    const data = await response.json();
    const games: Game[] = data.map((game) => {
      return {
        name: game.name,
        description: game.summary ? game.summary : '',
        storyLine: game.storyline ? game.storyline : '',
        releaseDate: new Date(game.first_release_date).toISOString(),
        platformId: game.platforms[0].id.toString(),
        coverUrl: game.cover.url ? game.cover.url : '',
        websiteUrl: game.websites[0].url ? game.websites[0].url : '',
        screenshotUrls: game.screenshots[0].url ? game.screenshots[0].url : '',
        genres: game.genres[0].name ? game.genres[0].name : '',
        rating: game.rating ? game.rating : 0,
      };
    });

    return games;
  }

  async searchIgdbPlatforms(name: string) {
    if (!this.igdbAuth.access_token) {
      await this.getIgdbAuth();
    }

    const response = await fetch('https://api.igdb.com/v4/platforms', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': this.config.get<string>('TWITCH_CLIENT_ID'),
        Authorization: `Bearer ${this.igdbAuth.access_token}`,
      },
      body: `search "${name}"; fields name, platform_logo.url, platform_family, summary, url, generation, websites.url, versions.name, versions.platform_version_release_dates.human, versions.platform_version_release_dates.region ; limit 10;`,
    });

    const data = await response.json();

    // const platforms = data.map((platform) => {
    //   return {
    //     name: platform.name,
    //     logoUrl: platform.logo.url ? platform.logo.url : '',
    //   };
    // });

    return data;
  }
}

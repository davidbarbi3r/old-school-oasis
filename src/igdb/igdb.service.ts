import { Injectable, NotFoundException } from '@nestjs/common';
import { IIgdbAuth } from './types/igdb';
import { ConfigService } from '@nestjs/config';

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
      body: `search "${name}"; fields name, category, cover.url, platforms.name, first_release_date, websites.url, summary, storyline, genres.name, rating, screenshots.url; limit 100; `,
    });

    const data = await response.json();
    const games = data.map((game) => {
      return {
        id: game.id,
        name: game.name,
        category: game.category,
        description: game.summary ? game.summary : null,
        storyLine: game.storyline ? game.storyline : null,
        rating: game.rating ? game.rating : null,
        coverUrl: game.cover ? game.cover.url.slice(2) : null,
        websiteUrl: game.websites ? game.websites[0].url : null,
        screenshotUrls: game.screenshots
          ? game.screenshots.map((screen) => screen.url.slice(2))
          : [],
        genres: game.genres ? game.genres.map((genre) => genre.name) : [],
        releaseDate: game.first_release_date
          ? new Date(game.first_release_date * 1000).toISOString()
          : null,
        platforms: game.platforms ? game.platforms.map((platform) => platform.id) : null,
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
      body: `search "${name}"; fields name, platform_logo.url, platform_family, summary, url, generation, websites.url, versions.name, versions.storage, versions.summary, versions.url, versions.cpu, versions.graphics, versions.platform_version_release_dates.human, versions.platform_version_release_dates.region ; limit 10;`,
    });

    const data = await response.json();

    if (data.length === 0) {
      return [];
    }

    return data;
  }

  async searchIgdbPlatformById(id: number) {
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
      body: `where id = ${id}; fields name, platform_logo.url, platform_family, summary, url, generation, websites.url, versions.name, versions.storage, versions.summary, versions.url, versions.cpu, versions.graphics, versions.platform_version_release_dates.human, versions.platform_version_release_dates.region; limit 1;`,
    });

    const data = await response.json();

    if (data.length === 0) {
      throw new NotFoundException(`No platform found`);
    }

    return data;
  }

  async searchPlatformVersions(name: string) {
    if (!this.igdbAuth.access_token) {
      await this.getIgdbAuth();
    }

    const response = await fetch('https://api.igdb.com/v4/platform_versions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': this.config.get<string>('TWITCH_CLIENT_ID'),
        Authorization: `Bearer ${this.igdbAuth.access_token}`,
      },
      body: `search "${name}"; fields *; limit 10;`,
    });

    const data = await response.json();

    if (data.length === 0) {
      return [];
    }

    return data;
  }

  async getIgdbGamesByPlatform(platformId: number, skip?: number, take?: number) {
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
      body: `fields name, category, cover.url, platforms.name, first_release_date, websites.url, summary, storyline, genres.name, rating, screenshots.url; where platforms = ${platformId}; 
      limit ${take || 20}; 
      offset ${skip || 0};`,
    });

    if (response.status !== 200) {
      throw new NotFoundException(`No games found`);
    }

    const data = await response.json();

    const games = data.map((game) => {
      return {
        id: game.id,
        name: game.name,
        category: game.category,
        description: game.summary ? game.summary : null,
        storyLine: game.storyline ? game.storyline : null,
        rating: game.rating ? game.rating : null,
        coverUrl: game.cover ? game.cover.url.slice(2) : null,
        websiteUrl: game.websites ? game.websites[0].url : null,
        screenshotUrls: game.screenshots
          ? game.screenshots.map((screen) => screen.url.slice(2))
          : [],
        genres: game.genres ? game.genres.map((genre) => genre.name) : [],
        releaseDate: game.first_release_date
          ? new Date(game.first_release_date * 1000).toISOString()
          : null,
        platforms: game.platforms ? game.platforms.map((platform) => platform.id) : null,
      };
    });

    return games;
  }

  async getIgdbPlatformById(id: number) {
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
      body: `where id = ${id}; fields name, platform_logo.url, platform_family, summary, url, generation, websites.url, versions.name, versions.storage, versions.summary, versions.url, versions.cpu, versions.graphics, versions.platform_version_release_dates.human, versions.platform_version_release_dates.region; limit 1;`,
    });

    const data = await response.json();

    if (data.length === 0) {
      return [];
    }

    return data;
  }
}

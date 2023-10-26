import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { CreatePlatformDto, CreatePlatformVersionDto, UpdatePlatformDto } from './dto';
import { IgdbService } from '../igdb/igdb.service';
import { igdbRegionsMap } from '../igdb/types/igdb';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService, private igdb: IgdbService) {}

  async getPlatformById(id: number) {
    const platform = await this.prisma.platform.findUnique({
      where: {
        id: id,
      },
      include: {
        versions: true,
      },
    });

    // if (!platform) {
    //   platform = await this.igdb.getIgdbPlatformById(id);
    // }

    return platform;
  }

  async getPlatformsStarter(id: number) {
    const igdbPlatform = await this.igdb.searchIgdbPlatformById(id);
    if (igdbPlatform.length === 0) throw new NotFoundException('No platform found');
    const platform = {
      id: igdbPlatform[0].id,
      name: igdbPlatform[0].name,
      logoUrl: igdbPlatform[0].platform_logo ? igdbPlatform[0].platform_logo.url.slice(2) : null,
      generation: igdbPlatform[0].generation ? igdbPlatform[0].generation : null,
    };
    const existingPlatform = await this.prisma.platform.findUnique({
      where: {
        id: platform.id,
      },
    });
    if (existingPlatform) {
      console.log('platform', platform.name, 'already exist');
      return {
        message: `platform ${platform.name} already exist`,
      };
    }
    if (!existingPlatform) {
      await this.createPlatform(platform);
      console.log('platform', platform.name, 'created');
    }

    const platformVersion = igdbPlatform[0].versions.map((version) => ({
      id: version.id,
      name: version.name,
      platformId: platform.id,
      summary: version.summary,
      url: version.url,
      storage: version.storage,
      cpu: version.cpu,
      graphics: version.graphics,
      firstReleaseDate: version.platform_version_release_dates
        ? new Date(version.platform_version_release_dates[0].human).toISOString()
        : null,
      region: version.platform_version_release_dates
        ? igdbRegionsMap[version.platform_version_release_dates[0].region]
        : null,
    }));

    for await (const version of platformVersion) {
      const existingPlatformVersion = await this.prisma.platformVersion.findUnique({
        where: {
          id: version.id,
        },
      });
      if (!existingPlatformVersion) {
        await this.createPlatformVersion(version);
        console.log('version', version.name, 'created');
      }
    }

    return {
      message: `platform ${platform.name} created`,
    };
  }

  async getPlatformByName(name: string, take?: number) {
    const platforms = await this.prisma.platform.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        versions: true,
      },
      take: take || 10,
    });

    // const igdbPlatforms = await this.igdb.searchIgdbPlatforms(name);

    if (platforms.length === 0) throw new NotFoundException('No platforms found');

    // const platforms = igdbPlatforms.map((platform) => ({
    //   id: platform.id,
    //   name: platform.name,
    //   logoUrl: platform.platform_logo ? platform.platform_logo.url.slice(2) : null,
    //   generation: platform.generation ? platform.generation : null,
    // }));
    //
    // for await (const platform of platforms) {
    //   const existingPlatform = await this.prisma.platform.findUnique({
    //     where: {
    //       id: platform.id,
    //     },
    //   });
    //   if (!existingPlatform) {
    //     await this.createPlatform(platform);
    //   }
    // }
    // for await (const platform of igdbPlatforms) {
    //   const platformVersion = platform.versions.map((version) => ({
    //     id: version.id,
    //     name: version.name,
    //     platformId: platform.id,
    //     summary: version.summary,
    //     url: version.url,
    //     storage: version.storage,
    //     cpu: version.cpu,
    //     graphics: version.graphics,
    //     firstReleaseDate: version.platform_version_release_dates
    //       ? new Date(version.platform_version_release_dates[0].human).toISOString()
    //       : null,
    //     region: version.platform_version_release_dates
    //       ? igdbRegionsMap[version.platform_version_release_dates[0].region]
    //       : null,
    //   }));
    //
    //   for await (const version of platformVersion) {
    //     const existingPlatformVersion = await this.prisma.platformVersion.findUnique({
    //       where: {
    //         id: version.id,
    //       },
    //     });
    //     if (!existingPlatformVersion) {
    //       await this.createPlatformVersion(version);
    //     }
    //   }
    // }

    return [...platforms];
  }

  async getAllPlatform(skip?: number, take?: number) {
    const platforms = await this.prisma.platform.findMany({
      skip: skip || 0,
      take: take,
    });

    if (platforms.length === 0) throw new NotFoundException('No platforms found');

    return platforms;
  }

  async createPlatform(dto: CreatePlatformDto) {
    const platform = await this.prisma.platform.create({
      data: {
        ...dto,
      },
    });

    return platform;
  }

  async createPlatformVersion(dto: CreatePlatformVersionDto) {
    const platformVersion = await this.prisma.platformVersion.create({
      data: {
        ...dto,
      },
    });

    return platformVersion;
  }

  async updatePlatform(id: number, dto: UpdatePlatformDto) {
    const updatedPlatform = await this.prisma.platform.update({
      where: {
        id: id,
      },
      data: dto,
    });

    if (!updatedPlatform) throw new NotFoundException('No platform found with this id');

    return updatedPlatform;
  }

  async deletePlatform(id: number) {
    const platform = await this.prisma.platform.delete({
      where: {
        id: id,
      },
    });

    if (!platform) throw new NotFoundException('No platform found with this id');

    return platform;
  }
}

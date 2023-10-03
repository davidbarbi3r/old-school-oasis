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
        games: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!platform) throw new NotFoundException('No platform found with this id');

    return platform;
  }

  async getPlatformByName(name: string) {
    const platforms = await this.prisma.platform.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    if (platforms.length === 0) {
      const igdbPlatforms = await this.igdb.searchIgdbPlatforms(name);

      if (igdbPlatforms.length === 0) throw new NotFoundException('No platforms found');

      const platforms = igdbPlatforms.map((platform) => ({
        id: platform.id,
        name: platform.name,
        logoUrl: platform.platform_logo ? platform.platform_logo.url : null,
        generation: platform.generation,
      }));

      await this.prisma.platform.createMany({
        data: platforms,
      });

      for await (const platform of igdbPlatforms) {
        const platformVersion = platform.versions.map((version) => ({
          id: version.id,
          name: version.name,
          platformId: platform.id,
          summary: version.summary,
          url: version.url,
          storage: version.storage,
          cpu: version.cpu,
          graphics: version.graphics,
          firstReleaseDate:
            version.platform_version_release_dates.length > 0
              ? new Date(version.platform_version_release_dates[0].human).toISOString()
              : null,
          region: igdbRegionsMap[version.platform_version_release_dates[0].region],
        }));

        for await (const version of platformVersion) {
          await this.createPlatformVersion(version);
        }
      }

      return igdbPlatforms;
    }
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

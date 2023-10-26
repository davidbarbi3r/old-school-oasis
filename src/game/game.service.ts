import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { IgdbService } from '../igdb/igdb.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService, private igdb: IgdbService) {}

  async getGameById(id: number) {
    const game = await this.prisma.game.findUnique({
      where: {
        id: id,
      },
    });

    if (!game) {
      throw new NotFoundException(`We haven't found game with this id`);
    }

    return game;
  }

  async getGamesByName(name: string) {
    // const games = await this.prisma.game.findMany({
    //   where: {
    //     name: {
    //       contains: name,
    //       mode: 'insensitive',
    //     },
    //   },
    // });

    // if (games.length > 0) {
    //   return games;
    // }

    const igdbGames = await this.igdb.searchIgdbGames(name);
    console.log('igdbGames', igdbGames);
    if (igdbGames.length === 0) {
      throw new NotFoundException(`No games found`);
    }

    for await (const game of igdbGames) {
      const existingGame = await this.prisma.game.findUnique({
        where: {
          id: game.id,
        },
      });

      if (!existingGame && game.platforms) {
        await this.createGame(game);
      }
    }

    return igdbGames;
  }

  async getAllGames(platform: string, skip?: number, take?: number) {
    const games = await this.prisma.game.findMany({
      where: {
        platforms: {
          some: {
            platform: {
              name: platform,
            },
          },
        },
      },
      skip: skip || 0,
      take: take,
      orderBy: {
        rating: 'desc',
      },
    });

    if (games.length === 0) {
      throw new NotFoundException(`No games found`);
    }

    return games;
  }

  async getGamesByPlatform(id: number, skip?: number, take?: number) {
    const games = await this.igdb.getIgdbGamesByPlatform(id, skip, take);

    if (games.length === 0) {
      throw new NotFoundException(`No games found`);
    }

    for await (const game of games) {
      const existingGame = await this.prisma.game.findUnique({
        where: {
          id: game.id,
        },
      });
      if (!existingGame) {
        await this.createGame(game);
      }
    }

    return games;
  }

  async createGame(dto: CreateGameDto) {
    const game = await this.prisma.game.create({
      data: {
        ...dto,
        // if no platforms are provided do not connect any
        platforms: {
          create: dto.platforms.map((platform) => ({
            platform: {
              connect: {
                id: platform,
              },
            },
          })),
        },
      },
    });

    return game;
  }

  async updateGame(id: number, dto: UpdateGameDto) {
    const updatedGame = await this.prisma.game.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });

    return updatedGame;
  }

  async deleteGame(id: number) {
    const deletedGame = await this.prisma.game.delete({
      where: {
        id: id,
      },
    });
    if (!deletedGame) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }

    return deletedGame;
  }
}

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
    const games = await this.prisma.game.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    /*if (games.length === 0) {
      throw new NotFoundException(`No games found`);
    }*/

    const igdbGames = await this.igdb.searchIgdbGames(name);

    if (igdbGames.length === 0) {
      throw new NotFoundException(`No games found`);
    }

    for await (const game of igdbGames) {
      await this.createGame(game);
    }

    return [...games, ...igdbGames];
  }

  async getAllGames(skip?: number, take?: number) {
    const games = await this.prisma.game.findMany({
      skip: skip || 0,
      take: take,
    });

    if (games.length === 0) {
      throw new NotFoundException(`No games found`);
    }

    return games;
  }

  async createGame(dto: CreateGameDto) {
    const game = await this.prisma.game.create({
      data: dto,
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

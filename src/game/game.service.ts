import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async getGameById(id: string) {
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

  async getGameByName(name: string) {
    const game = await this.prisma.game.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    if (game.length === 0) {
      throw new NotFoundException(`We haven't found game with this name`);
    }

    return game;
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

  async updateGame(id: string, dto: UpdateGameDto) {
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

  async deleteGame(id: string) {
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

import { Injectable } from "@nestjs/common"
import { IGame } from "./types/game.type"
import { RedisService } from "src/redis/redis.service"

// repository is a data access layer

@Injectable()
export class GameRepository {
  constructor(private readonly redis: RedisService) {}

  async createGame(game: IGame) {
    return await this.redis.hset("games", game.name, JSON.stringify(game))
  }

  async getGame(gameName: string): Promise<IGame> {
    return JSON.parse(await this.redis.hget("games", gameName))
  }

  async getAllGames(): Promise<IGame[]> {
    const games = await this.redis.hgetAll("games")
    return Object.values(games).map((game) => JSON.parse(game))
  }
}

import { Injectable } from "@nestjs/common"
import { IGame } from "./types/game.type"
import { GameRepository } from "./games.repository"

// service is a business logic layer

@Injectable()
export class GamesService {
  constructor(private readonly gameRepository: GameRepository) {
    this.gameRepository = gameRepository
  }
}

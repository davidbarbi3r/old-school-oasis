import { Controller, Get, Post, Body, Param } from "@nestjs/common"
import { GamesService } from "./games.service"
import { CreateGameDto } from "./dto/create-game.dto"
import { UpdateGameDto } from "./dto/update-game.dto"
import { GameRepository } from "./games.repository"
import { IGame } from "./types/game.type"

@Controller("games")
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private gameRepository: GameRepository,
  ) {}

  @Post()
  create(@Body() createGameDto: IGame) {
    return this.gameRepository.createGame(createGameDto)
  }

  @Get()
  findAll() {
    return this.gameRepository.getAllGames()
  }

  @Get(":name")
  findOne(@Param("name") name: string) {
    return this.gameRepository.getGame(name)
  }
}

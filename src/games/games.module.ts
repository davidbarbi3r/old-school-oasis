import { Module } from "@nestjs/common"
import { GamesService } from "./games.service"
import { GamesController } from "./games.controller"
import { GameRepository } from "./games.repository"
import { RedisModule } from "src/redis/redis.module"

@Module({
  imports: [RedisModule],
  controllers: [GamesController],
  providers: [GamesService, GameRepository],
  exports: [GameRepository, GamesService],
})
export class GamesModule {}

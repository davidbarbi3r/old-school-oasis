import { Game, GameItem } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { AdminRoleGuard } from 'src/user/guard';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  getGameById(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllGames(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.gameService.getAllGames(skip, take);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Post('create')
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Put('update/:id')
  updateGame(@Param('id') id: string, @Body() dto: UpdateGameDto) {
    return this.gameService.updateGame(id, dto);
  }
}

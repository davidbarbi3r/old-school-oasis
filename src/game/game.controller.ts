import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { AdminRoleGuard } from 'src/user/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('games')
@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @ApiOperation({ summary: 'Get game by id' })
  @ApiResponse({ status: 200, description: 'Return game by id' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @UseGuards(JwtGuard)
  @Get(':id')
  getGameById(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  @ApiOperation({ summary: 'Search game by name' })
  @ApiResponse({ status: 200, description: 'Return games by name' })
  @ApiResponse({ status: 404, description: 'No games found' })
  @UseGuards(JwtGuard)
  @Get('search/:name')
  searchGamesByName(@Param('name') name: string) {
    return this.gameService.getGamesByName(name);
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

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Delete('delete/:id')
  deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  }
}

import { Module } from '@nestjs/common';
import { IgdbController } from './igdb.controller';
import { IgdbService } from './igdb.service';
import { GameModule } from '../game/game.module';

@Module({
  controllers: [IgdbController],
  providers: [IgdbService],
  imports: [GameModule],
})
export class IgdbModule {}

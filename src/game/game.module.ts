import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [UserModule], // to get the adminguard
  exports: [GameService],
})
export class GameModule {}

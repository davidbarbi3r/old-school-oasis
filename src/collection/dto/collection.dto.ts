import { IsNumber, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class AddGameToCollectionDto {
  @IsNumber()
  gameId: number;

  @IsNumber()
  platformId: number;
}

export class AddPlatformToCollectionDto {
  @IsNumber()
  platformId: number;

  @IsNumber()
  versionId: number;
}

import { IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  storyLine: string;

  @IsString()
  rating: number;

  @IsString()
  coverUrl: string;

  @IsString()
  websiteUrl: string;

  @IsString()
  screenshotUrls: string;

  @IsString()
  genres: string;

  @IsISO8601()
  releaseDate: string;

  @IsUUID()
  platformId: string;
}

export class UpdateGameDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsISO8601()
  releaseDate: string;

  @IsOptional()
  @IsUUID()
  platformId: string;
}

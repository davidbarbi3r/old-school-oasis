import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

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

  @IsInt()
  platformId: number;
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
  @IsInt()
  platformId: number;
}

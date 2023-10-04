import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsInt()
  id: number;

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

  @IsString({ each: true})
  screenshotUrls: string[];

  @IsString({ each: true})
  genres: string[];

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

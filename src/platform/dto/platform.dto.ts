import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreatePlatformDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  logoUrl: string;

  @IsInt()
  generation: number;
}

export class CreatePlatformVersionDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  summary: string;

  @IsString()
  url: string;

  @IsString()
  storage: string;

  @IsString()
  cpu: string;

  @IsString()
  graphics: string;

  @IsString()
  firstReleaseDate: string;

  @IsString()
  region: string;

  @IsInt()
  platformId: number;
}

export class UpdatePlatformDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsISO8601()
  releaseDate: string;
}

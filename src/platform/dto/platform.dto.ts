import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreatePlatformDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsISO8601()
  releaseDate: string;
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

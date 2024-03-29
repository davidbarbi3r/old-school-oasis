import { Optional } from '@nestjs/common';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class IAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'This password is not strong enough',
  })
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Optional()
  @IsString()
  role?: Role;
}

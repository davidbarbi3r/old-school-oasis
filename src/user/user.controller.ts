import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(
    // 👈 we use the @UseGuards() decorator to protect the route
    // 👇 we pass the name of the strategy we want to use
    // the name is the one we defined in the JwtStrategy class (line 7)
    JwtGuard,
  )
  @Get('me')
  getMe(@getUser() user: User) {
    return user;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { AdminRoleGuard } from './guard';
import { ChangeRoleDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //ok
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

  //ok
  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  //ok
  @UseGuards(JwtGuard)
  @Get()
  getAllUsers(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.userService.getAllUsers(skip, take);
  }

  //ok
  @UseGuards(JwtGuard)
  @Put('me') // put is used to update the whole object
  updateMe(@getUser() { id }: User, @Body() updateDto: UpdateUserDto) {
    return this.userService.updateProfile(id, updateDto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Put(':id') // put is used to update the whole object
  updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.userService.updateProfile(id, updateDto);
  }

  //ok
  @UseGuards(JwtGuard, AdminRoleGuard)
  @Patch('change-role/:id') // patch is used to update a part of the object, here just role
  changeRole(@Param('id') id: string, @Body() dto: ChangeRoleDto) {
    return this.userService.changeUserRole(id, dto);
  }

  //ok
  @UseGuards(JwtGuard, AdminRoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const user = await this.userService.getUserById(request.user.id);
      return user.role === Role.admin;
    }
    return false;
  }
}

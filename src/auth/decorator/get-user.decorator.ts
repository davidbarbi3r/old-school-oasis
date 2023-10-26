import { ExecutionContext, createParamDecorator, UnauthorizedException } from '@nestjs/common';

export const getUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  // get authorization header from request
  const authHeader = request.headers.authorization;
  const token = authHeader.split(' ')[1];
  // decode token
  const decodedToken = Buffer.from(token, 'base64').toString('ascii');

  if (decodedToken.length < 10) {
    throw new UnauthorizedException('You are not authorized');
  }
  // get userid from jwt token
  const userId = decodedToken.split('"sub":')[1].split(',')[0].split('"')[1];

  return userId;
});

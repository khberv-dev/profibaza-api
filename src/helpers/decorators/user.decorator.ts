import { createParamDecorator } from '@nestjs/common';

export type User = {
  id: string;
  roleUID: string;
};

export const User = createParamDecorator((data, context): User => {
  const req = context.switchToHttp().getRequest();

  return req['user'] as User;
});

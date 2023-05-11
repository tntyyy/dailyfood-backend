import { UnauthorizedException } from '@nestjs/common';

export const getTokenFromRequest = (req: any): string => {
  const authHeader = req.headers.authorization;
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    throw new UnauthorizedException({
      message: 'Пользователь не авторизован',
    });
  }

  return token;
};

import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from '@/interfaces/personas';
import { TokenRequest } from '@/interfaces/express';
import { getJwtPayload } from '@/utils/jwt';
import { AuthError } from '@/errors';

const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    throw new AuthError();
  }
  try {
    const jwtPayload = getJwtPayload(token) as TokenPayload;
    (<TokenRequest>req).token = jwtPayload;
    next();
  } catch (error) {
    throw new AuthError();
  }
};

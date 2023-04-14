import { Request, Response, NextFunction } from 'express';
import { IUser, TokenPayload } from '../../interfaces/user';
import { ProtectedRequest, TokenRequest } from '../../interfaces/express';
import { getJwtPayload } from '../../utils/jwt';
import { AuthError } from '../../errors';

import AuthService from '../../services/auth';
import UserModel from '../../models/User';

const authService = new AuthService(UserModel);

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

export const attachUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userRecord = (await authService.getUserById(
      (<TokenRequest>req).token.userId,
    )) as IUser;
    (<ProtectedRequest>req).user = userRecord;
    next();
  } catch (error) {
    throw new AuthError();
  }
};

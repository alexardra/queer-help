import { Request, Response, NextFunction } from 'express';
import {
  IAdmin,
  IPersona,
  IUser,
  PersonaRoleTypes,
  TokenPayload,
} from '@/interfaces/personas';
import { ProtectedRequest, TokenRequest } from '@/interfaces/express';
import { getJwtPayload } from '@/utils/jwt';
import { AuthError } from '@/errors';
import AdminService from '@/services/admin';
import AdminModel from '@/models/Admin';
import UserService from '@/services/user';
import UserModel from '@/models/User';

const userService = new UserService(UserModel);
const adminService = new AdminService(AdminModel);

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

export const attachPersona = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userRecord = (await userService.getPersonaById(
      (<TokenRequest>req).token.personaId,
    )) as IUser;

    (<ProtectedRequest>req).persona = userRecord as IPersona;
    (<ProtectedRequest>req).role = PersonaRoleTypes.USER;
    next();
  } catch (e) {
    // not a user
  }

  try {
    const adminRecord = (await adminService.getPersonaById(
      (<TokenRequest>req).token.personaId,
    )) as IAdmin;
    (<ProtectedRequest>req).persona = adminRecord as IPersona;
    (<ProtectedRequest>req).role = PersonaRoleTypes.ADMIN;
    next();
  } catch (error) {
    throw new AuthError();
  }
};

import { Request, Response, NextFunction } from 'express';
import UserModel from '@/models/User';
import UserService from '@/services/user';
import { ForbiddenError, AuthError } from '@/errors';
import { TokenRequest, ProtectedRequest } from '@/interfaces/express';
import {
  IPersona,
  IUser,
  PersonaRoleTypes,
  UserVerificationStatus,
} from '@/interfaces/personas';

const userService = new UserService(UserModel);

export const isVerifiedUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRecord = (await userService.getPersonaById(
    (<TokenRequest>req).token.personaId,
  )) as IUser;
  // TODO: uncomment this check
  // if (userRecord.verificationStatus != UserVerificationStatus.Verified) {
  //   throw new ForbiddenError();
  // }
  next();
};

export const attachUser = async (
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
  } catch (error) {
    throw new AuthError();
  }
};

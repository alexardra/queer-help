import { Request, Response, NextFunction } from 'express';
import AdminService from '@/services/admin';
import AdminModel from '@/models/Admin';
import { TokenRequest, ProtectedRequest } from '@/interfaces/express';
import { IAdmin, IPersona, PersonaRoleTypes } from '@/interfaces/personas';
import { ForbiddenError, AuthError } from '@/errors';

const adminService = new AdminService(AdminModel);

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    (await adminService.getPersonaById(
      (<TokenRequest>req).token.personaId,
    )) as IAdmin;

    next();
  } catch (error) {
    throw new ForbiddenError();
  }
};

export const attachAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

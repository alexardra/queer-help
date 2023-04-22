import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import middlewares from '@/api/middlewares';
import { IAdmin, IUser, PersonaRoleTypes } from '@/interfaces/personas';
import { ProtectedRequest } from '@/interfaces/express';
import AdminMapper from '@/mappers/admin';
import UserMapper from '@/mappers/user';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.get(
    '/me',
    middlewares.isAuth,
    middlewares.attachPersona,
    (req: Request, res: Response) => {
      const role = (<ProtectedRequest>req).role;
      const persona = (<ProtectedRequest>req).persona;

      if (role === PersonaRoleTypes.USER) {
        return res
          .status(StatusCodes.OK)
          .json(UserMapper.toDTO(persona as IUser));
      }
      res.status(StatusCodes.OK).json(AdminMapper.toDTO(persona as IAdmin));
    },
  );
};

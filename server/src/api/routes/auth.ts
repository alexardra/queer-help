import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import middlewares from '@/api/middlewares';

import UserModel from '@/models/User';
import UserService from '@/services/user';
import AdminService from '@/services/admin';
import AdminModel from '@/models/Admin';

import { IAdmin, IUser } from '@/interfaces/personas';
import { TokenRequest } from '@/interfaces/express';
import AdminMapper from '@/mappers/admin';
import UserMapper from '@/mappers/user';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const userService = new UserService(UserModel);
  const adminService = new AdminService(AdminModel);

  route.get('/me', middlewares.isAuth, async (req: Request, res: Response) => {
    try {
      const userRecord = (await userService.getPersonaById(
        (<TokenRequest>req).token.personaId,
      )) as IUser;

      const persona = userRecord;
      res.status(StatusCodes.OK).json(UserMapper.toDTO(persona as IUser));
    } catch (e) {
      const adminRecord = (await adminService.getPersonaById(
        (<TokenRequest>req).token.personaId,
      )) as IAdmin;

      const persona = adminRecord;
      res.status(StatusCodes.OK).json(AdminMapper.toDTO(persona as IAdmin));
    }
  });
};

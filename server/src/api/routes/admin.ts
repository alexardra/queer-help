import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import middlewares from '@/api/middlewares';
import AdminService from '@/services/admin';
import AdminModel from '@/models/Admin';
import AdminMapper from '@/mappers/admin';
import { IAdmin } from '@/interfaces/personas';

import UserService from '@/services/user';
import UserModel from '@/models/User';
import UserMapper from '@/mappers/user';

const route = Router();

export default (app: Router) => {
  app.use('/admin', route);

  const adminService = new AdminService(AdminModel);
  const userService = new UserService(UserModel);

  route.post(
    '/login',
    middlewares.validator(middlewares.Resource.LOGIN),
    async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const { persona, token } = await adminService.login(email, password);
      res
        .status(StatusCodes.OK)
        .json({ persona: AdminMapper.toDTO(persona as IAdmin), token });
    },
  );

  route.post(
    '/register',
    middlewares.validator(middlewares.Resource.REGISTER_ADMIN),
    async (req: Request, res: Response) => {
      const { email, password, firstname, lastname } = req.body;

      const { admin, token } = await adminService.register({
        email,
        password,
        firstname,
        lastname,
      });
      res
        .status(StatusCodes.CREATED)
        .json({ persona: AdminMapper.toDTO(admin), token });
    },
  );

  route.get(
    '/users/',
    middlewares.isAuth,
    middlewares.isAdmin,
    middlewares.attachAdmin,
    async (req: Request, res: Response) => {
      const { users } = await userService.getUsers();
      const userDtos = users.map((u) => UserMapper.toDTO(u));

      res.status(StatusCodes.OK).json({ users: userDtos });
    },
  );

  route.get(
    '/user/:email',
    middlewares.isAuth,
    middlewares.isAdmin,
    middlewares.attachAdmin,
    async (req: Request, res: Response) => {
      const email = req.params.email;
      const userRecord = await userService.getPersonaByEmail(email);

      res.status(StatusCodes.OK).json({ user: UserMapper.toDTO(userRecord) });
    },
  );
};

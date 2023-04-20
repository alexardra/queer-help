import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import middlewares from '@/api/middlewares';
import UserModel from '@/models/User';
import UserService from '@/services/user';
import UserMapper from '@/mappers/user';
import { IUser } from '@/interfaces/personas';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  const userService = new UserService(UserModel);

  route.post(
    '/register',
    middlewares.validator(middlewares.Resource.REGISTER_USER),
    async (req: Request, res: Response) => {
      const {
        email,
        password,
        firstname,
        lastname,
        referenceLinks,
        personalNumber,
        role,
        phoneNumber,
        description,
      } = req.body;

      const { user, token } = await userService.register({
        email,
        password,
        firstname,
        lastname,
        referenceLinks,
        personalNumber,
        role,
        phoneNumber,
        description,
      });
      res
        .status(StatusCodes.CREATED)
        .json({ persona: UserMapper.toDTO(user), token });
    },
  );

  route.post(
    '/login',
    middlewares.validator(middlewares.Resource.LOGIN),
    async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const { persona, token } = await userService.login(email, password);
      res
        .status(StatusCodes.OK)
        .json({ persona: UserMapper.toDTO(persona as IUser), token });
    },
  );
};

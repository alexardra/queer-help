import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import middlewares from '../middlewares';
import AuthService from '../../services/auth';
import UserModel from '../../models/User';
import UserMapper from '../../mappers/user';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const authService = new AuthService(UserModel);

  route.post(
    '/register',
    middlewares.validator(middlewares.Resource.REGISTER),
    async (req: Request, res: Response) => {
      const {
        email,
        password,
        firstname,
        lastname,
        referenceLinks,
        personalNumber,
      } = req.body;

      const { user, token } = await authService.register({
        email,
        password,
        firstname,
        lastname,
        referenceLinks,
        personalNumber,
      });
      res
        .status(StatusCodes.CREATED)
        .json({ user: UserMapper.toDTO(user), token });
    },
  );

  route.post(
    '/login',
    middlewares.validator(middlewares.Resource.LOGIN),
    async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.status(StatusCodes.OK).json({ user: UserMapper.toDTO(user), token });
    },
  );
};

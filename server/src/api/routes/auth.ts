import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/register', (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    res.status(StatusCodes.OK).json({ email, name, password });
  });

  route.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    res.status(StatusCodes.OK).json({ email, password });
  });
};

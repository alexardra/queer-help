import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const route = Router();

export default (app: Router) => {
  app.use('/tasks', route);

  route.get('/', (req: Request, res: Response) => {
    // fake endpoint for testing
    res.status(StatusCodes.OK).json({
      data: [],
    });
  });
};

import { Router } from 'express';
import tasks from './routes/tasks';
import auth from './routes/auth';

export default () => {
  const app = Router();

  auth(app);
  tasks(app);
  return app;
};

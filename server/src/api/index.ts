import { Router } from 'express';
import tasks from './routes/tasks';
import user from './routes/user';
import admin from './routes/admin';
import auth from './routes/auth';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  admin(app);
  tasks(app);

  return app;
};

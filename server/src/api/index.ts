import { Router } from 'express';
import tasks from './routes/tasks';
import user from './routes/user';
import admin from './routes/admin';

export default () => {
  const app = Router();

  user(app);
  admin(app);
  tasks(app);

  return app;
};

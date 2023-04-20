import { Router } from 'express';
import user from './routes/user';
import admin from './routes/admin';
import auth from './routes/auth';
import assistances from './routes/assistances';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  admin(app);
  assistances(app);

  return app;
};

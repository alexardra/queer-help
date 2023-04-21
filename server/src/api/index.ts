import { Router } from 'express';
import user from './routes/user';
import admin from './routes/admin';
import auth from './routes/auth';
import assistances from './routes/assistances';
import chats from './routes/chats';
import messages from './routes/messages';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  admin(app);
  assistances(app);
  chats(app);
  messages(app);

  return app;
};

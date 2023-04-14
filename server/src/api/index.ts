import { Router } from 'express';
import tasks from './routes/tasks';

export default () => {
  const app = Router();

  tasks(app);
  return app;
};

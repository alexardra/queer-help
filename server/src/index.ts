import express from 'express';
import config from './config';
import { initLoaders } from './loaders';

const startServer = () => {
  const app = express();

  try {
    initLoaders(app);

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

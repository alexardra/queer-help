import express from 'express';
import config from './config';
import { initLoaders } from './loaders';

const startServer = async () => {
  const app = express();

  try {
    const http = await initLoaders(app);

    http.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

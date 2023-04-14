import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import config from '../config';
import routes from '../api';
import swaggerDocs from './swagger';
import { ApiError, NotFoundError, ServiceUnavailableError } from '../errors';

export default (app: express.Application) => {
  app.use(express.json());
  /** Cors */
  app.use(
    cors({
      origin: 'http://localhost:8080',
    }),
  );
  /** Logging */
  app.use(morgan(config.morganLogFormat));

  /** Serve swagger Docs */
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /** API Routes */
  app.use(config.api.prefix, routes());

  /** Healtcheck endpoint */
  app.use('healthcheck', (req: express.Request, res: express.Response) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };

    try {
      res.send(healthcheck);
    } catch (error) {
      throw new ServiceUnavailableError('Health check failed');
    }
  });

  /** Not Found Handler */
  app.use((req: express.Request, res: express.Response) => {
    const error = new NotFoundError('Route does not exist');
    res.status(error.status).send(error.message);
  });

  /** Error Handler */
  app.use((err: ApiError, req: express.Request, res: express.Response) => {
    console.log(`Error occured: ${err.stack}`);
    res.status(err.status || 500).json({
      errors: {
        message: err.message || 'Something went wrong try again later',
      },
    });
  });
};

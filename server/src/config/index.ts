import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = dotenv.config();

if (config.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: process.env.PORT || 3000,
  morganLogFormat: 'tiny',
  databaseURL: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtAlgorithm: process.env.JWT_ALGO,
  jwtLifetime: process.env.JWT_LIFETIME,
  api: {
    prefix: '/api',
  },
};

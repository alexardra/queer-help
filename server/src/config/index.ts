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
  jwt: {
    secret: process.env.JWT_SECRET || '',
    algo: process.env.JWT_ALGO,
    lifetime: process.env.JWT_LIFETIME,
  },
  genSaltRounds: process.env.SALT_ROUNDS,
  api: {
    prefix: '/api',
  },
};

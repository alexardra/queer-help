import express from 'express';
import mongooseLoader from './mongoose';
import expressLoader from './express';

export async function initLoaders(app: express.Application) {
  await mongooseLoader();
  console.log('Connected to db');

  expressLoader(app);
  console.log('Load express routes');
}

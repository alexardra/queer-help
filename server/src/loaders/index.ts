import express from 'express';
import mongooseLoader from './mongoose';
import expressLoader from './express';
import socketioLoader from './socketio';

export async function initLoaders(app: express.Application) {
  await mongooseLoader();
  console.log('Connected to db');

  expressLoader(app);
  console.log('Load express routes');

  const http = socketioLoader(app);
  console.log('Set up socket io');
  return http;
}

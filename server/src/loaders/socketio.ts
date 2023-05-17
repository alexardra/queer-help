import express from 'express';
import { createServer } from 'http';
import { MessagingSocket } from '@/services/messaging';

export default (app: express.Application) => {
  const httpServer = createServer(app);
  const messagingSocket = new MessagingSocket(httpServer);
  messagingSocket.initializeSocket({
    cors: {
      origin: 'http://localhost:8080',
    },
  });

  return httpServer;
};

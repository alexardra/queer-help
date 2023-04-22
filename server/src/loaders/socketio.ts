import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

export default (app: express.Application) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:8080',
    },
  });

  let activeUsers: { userId: string; socketId: string }[] = [];

  io.on('connection', (socket) => {
    console.log(`SocketIO: New Connection - ${socket.id}`);

    socket.on('add-user', (newUserId) => {
      console.log(`SocketIO: New User - ${newUserId}`);

      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id,
        });
      }
    });

    socket.on('disconnect', () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log(`SocketIO: Disconnected - ${socket.id}`);
    });
  });

  return httpServer;
};

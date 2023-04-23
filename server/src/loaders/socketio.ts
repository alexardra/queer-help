import { IMessageDto } from '@/interfaces/messaging';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

type ConnectedUser = {
  personaId: string;
  socketId: string;
};

type ConnectedChat = {
  chatId: string;
  users: ConnectedUser[];
};

export default (app: express.Application) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:8080',
    },
  });

  let activeChats = [] as ConnectedChat[];

  io.on('connection', (socket) => {
    console.log(`SocketIO: New Connection - ${socket.id}`);

    socket.on('addChat', (chat: { personaId: string; chatId: string }) => {
      console.log(
        `SocketIO: New User - ${chat.personaId} on chat - ${chat.chatId}`,
      );

      const activeChat = activeChats.find((c) => c.chatId === chat.chatId);
      if (!activeChat) {
        activeChats.push({
          chatId: chat.chatId,
          users: [{ personaId: chat.personaId, socketId: socket.id }],
        });
      } else {
        const user = activeChat.users.find(
          (user) => user.personaId === chat.personaId,
        );
        if (!user) {
          activeChat.users.push({
            personaId: chat.personaId,
            socketId: socket.id,
          });
        } else {
          user.socketId = socket.id;
        }
      }
    });

    socket.on('message', (message: IMessageDto) => {
      console.log(`SocketIO: Received message`, message);
      const activeChat = activeChats.find((c) => c.chatId === message.chatId);

      if (!activeChat) return;

      const listener = activeChat.users.find(
        (user) => user.personaId !== message.senderId,
      );

      if (!listener) return;
      console.log(`SocketIO: Emitting message`, listener.socketId);
      io.to(listener.socketId).emit('message', {
        ...message,
        senderId: null,
      });
    });

    socket.on('disconnect', () => {
      activeChats = activeChats
        .map((chat) => ({
          chatId: chat.chatId,
          users: chat.users.filter((user) => user.socketId === socket.id),
        }))
        .filter(
          (chat) =>
            chat.users.length === 1 && chat.users[0].socketId === socket.id,
        );
      console.log(`SocketIO: Disconnected - ${socket.id}`);
    });
  });

  return httpServer;
};

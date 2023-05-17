import { IMessageDto } from '@/interfaces/messaging';
import { IncomingMessage, ServerResponse, Server as HttpSocket } from 'http';
import { Server, ServerOptions, Socket } from 'socket.io';

interface ListenEvents {
  addChat: (chat: Chat) => void;
  message: (message: IMessageDto) => void;
  disconnect: () => void;
}

interface EmitEvents {
  message: IMessageDto & { sender: string | null };
}

type ConnectedUser = {
  personaId: string;
  socketId: string;
};

type Chat = {
  personaId: string;
  chatId: string;
};

type ConnectedChat = {
  chatId: string;
  users: ConnectedUser[];
};

export class MessagingSocket {
  activeChats: ConnectedChat[];

  constructor(
    private server: HttpSocket<typeof IncomingMessage, typeof ServerResponse>,
  ) {
    this.activeChats = [] as ConnectedChat[];
  }

  _onAddChat(socket: Socket, chat: Chat) {
    console.log(
      `SocketIO: New User - ${chat.personaId} on chat - ${chat.chatId}`,
    );

    const activeChat = this.activeChats.find((c) => c.chatId === chat.chatId);
    if (!activeChat) {
      this.activeChats.push({
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
  }

  _onMessage(message: IMessageDto) {
    console.log(`SocketIO: Received message - ${message.id}`);

    const activeChat = this.activeChats.find(
      (c) => c.chatId === message.chatId,
    );
    if (!activeChat) return;

    const listener = activeChat.users.find(
      (user) => user.personaId !== message.senderId,
    );
    return listener?.socketId;
  }

  _emitMessage(io: Server, socketId: string, message: IMessageDto) {
    console.log(`SocketIO: Emitting message to socket - ${socketId}`);

    io.to(socketId).emit('message', {
      ...message,
      senderId: null,
    });
  }

  initializeSocket(config?: Partial<ServerOptions>) {
    const io = new Server<ListenEvents, EmitEvents>(this.server, config);

    io.on('connection', (socket) => {
      console.log(`SocketIO: New Connection - ${socket.id}`);

      socket.on('addChat', (chat: Chat) => {
        this._onAddChat(socket, chat);
      });

      socket.on('message', (message: IMessageDto) => {
        const listenerSocketId = this._onMessage(message);
        if (listenerSocketId) {
          this._emitMessage(io, listenerSocketId, message);
        }
      });

      socket.on('disconnect', () => {
        this.activeChats = this.activeChats
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
  }
}

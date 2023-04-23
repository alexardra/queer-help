import {
  useContext,
  createContext,
  useRef,
  useEffect,
  RefObject,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import { SOCKET_URL } from '@/config';
import { PersonaCredentials } from '@/features/auth/api';
import { PersonaRoleTypes } from '@/features/auth/api';
import { Chat, MessageType } from '@/features/messaging/api';

type SocketContext = {
  socket?: RefObject<Socket>;
  receivedMessage?: MessageType;
};

const SocketContext = createContext<SocketContext>({});

export function SocketProvider({
  children,
  persona,
  chat,
}: {
  children: React.ReactNode;
  persona: PersonaCredentials | null;
  chat: Chat | null;
}) {
  const socket = useProvideSocket(persona, chat);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useMessagingSocket = () => {
  return useContext(SocketContext);
};

function useProvideSocket(
  persona: PersonaCredentials | null,
  chat: Chat | null,
) {
  const socket = useRef<Socket>();
  const [receivedMessage, setReceivedMessage] = useState<
    MessageType | undefined
  >();

  useEffect(() => {
    if (persona === null || persona.role === PersonaRoleTypes.ADMIN) return;
    socket.current = io(SOCKET_URL);

    socket.current.on('message', (message: MessageType) => {
      setReceivedMessage(message);
    });

    return () => {
      socket.current?.off('message');
      socket.current?.off('disconnect');
    };
  }, [persona]);

  useEffect(() => {
    if (persona !== null && chat !== null)
      socket.current?.emit('addChat', {
        personaId: persona.id,
        chatId: chat.id,
      });
  }, [persona, chat]);

  return { socket, receivedMessage } as SocketContext;
}

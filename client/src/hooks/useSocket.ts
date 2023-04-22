import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { SOCKET_URL } from '@/config';
import { PersonaCredentials } from '@/features/auth/api';
import { PersonaRoleTypes } from '@/features/auth/api';

type SocketEmitEvent = {
  name: string;
  data: unknown;
};
type SocketListenerEvent = {
  name: string;
  callback: (params: unknown) => void;
};

export type SocketHookConfig = {
  emits?: SocketEmitEvent[];
  listeners?: SocketListenerEvent[];
};

export default function useSocket(
  persona: PersonaCredentials | null,
  config: SocketHookConfig,
) {
  const socket = useRef<Socket>();

  useEffect(() => {
    if (persona === null || persona.role === PersonaRoleTypes.ADMIN) return;
    console.log(SOCKET_URL);
    socket.current = io(SOCKET_URL);
    console.log(socket);

    if (config.emits) {
      for (const emitEvent of config.emits) {
        socket.current.emit(emitEvent.name, emitEvent.data);
      }
    }

    if (config.listeners) {
      for (const listenerEvent of config.listeners) {
        socket.current.on(listenerEvent.name, listenerEvent.callback);
      }
    }

    return () => {
      if (config.listeners) {
        for (const listenerEvent of config.listeners) {
          if (socket.current)
            socket.current.off(listenerEvent.name, listenerEvent.callback);
        }
      }
      socket.current?.off('disconnect');
    };
  }, [persona, config]);

  return socket;
}

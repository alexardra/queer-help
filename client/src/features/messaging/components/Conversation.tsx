import { Button } from '@/components/Button';
import {
  Chat,
  FetchMessagesResponse,
  MessageType,
  createMessage,
  getMessages,
} from '../api';
import { Message } from './Message';
import { Input } from '@/components/Input';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMessagingSocket } from '@/hooks/useMessagingSocket';

const ConversationContent = ({
  messages,
  isLoading,
  isError,
}: {
  messages: MessageType[];
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) {
    return <div className="text-center text-sm text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-sm text-gray-800">
        Something went wrong.. refresh
      </div>
    );
  }

  return (
    <div className="h-100 grid grid-cols-12 gap-y-1">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export const Conversation = ({ chat }: { chat: Chat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { socket, receivedMessage } = useMessagingSocket();

  const useCreateMessage = useMutation({
    mutationFn: createMessage,
    onSuccess: ({ message }) => {
      setMessages([...messages, message]);
      socket?.current?.emit('message', message);
    },
  });

  useEffect(() => {
    setMessages((prevState) => {
      return receivedMessage ? [...prevState, receivedMessage] : prevState;
    });
  }, [receivedMessage]);

  const { isLoading, isError } = useQuery({
    queryKey: ['messages', chat.id],
    queryFn: () => getMessages(chat.id),
    onSuccess: (data: FetchMessagesResponse) => {
      setMessages(data.messages);
    },
  });

  const scroll = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      console.log(scroll.current);
      if (scroll.current)
        scroll.current.scrollTop = scroll.current?.scrollHeight;
    }, 100);
  }, [messages]);

  return (
    <div className="flex h-full flex-auto flex-col bg-gray-50 p-6">
      <div className="flex flex-auto flex-shrink-0 flex-col rounded-2xl bg-white p-4">
        <div
          className="mb-4 flex h-[calc(100vh-250px)] flex-col overflow-x-auto overflow-y-auto"
          ref={scroll}
          id="bl"
        >
          <div className="flex h-full flex-col">
            <ConversationContent
              messages={messages}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
        <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
          <div className="flex-grow">
            <div className="relative w-full">
              <Input type="text" value={message} onChange={setMessage} />
            </div>
          </div>
          <div className="ml-4">
            <Button
              variant="primary"
              size="sm"
              disabled={message.length === 0}
              isLoading={useCreateMessage.isLoading}
              onClick={() => {
                useCreateMessage.mutate({ chatId: chat.id, text: message });
                setMessage('');
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

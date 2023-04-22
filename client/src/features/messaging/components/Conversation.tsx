import { Button } from '@/components/Button';
import {
  Chat,
  FetchMessagesResponse,
  createMessage,
  getMessages,
} from '../api';
import { Message } from './Message';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

const ConversationContent = ({
  data,
  isLoading,
  isError,
}: {
  data?: FetchMessagesResponse;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) {
    return <div className="text-center text-sm text-gray-600">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center text-sm text-gray-800">
        Something went wrong.. refresh
      </div>
    );
  }

  const { messages } = data;
  return (
    <div className="grid grid-cols-12 gap-y-1">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export const Conversation = ({ chat }: { chat: Chat }) => {
  const [message, setMessage] = useState('');

  const useCreateMessage = useMutation({
    mutationFn: createMessage,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['messages', chat.id],
    queryFn: () => getMessages(chat.id),
  });

  return (
    <div className="flex h-full flex-auto flex-col bg-gray-50 p-6">
      <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-white p-4">
        <div className="mb-4 flex h-full flex-col overflow-x-auto">
          <div className="flex h-full flex-col">
            <ConversationContent
              data={data}
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

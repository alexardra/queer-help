import { Button } from '@/components/Button';
import { Chat, createMessage } from '../api';
import { Message } from './Message';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export const Conversation = ({ chat }: { chat: Chat }) => {
  const [message, setMessage] = useState('');

  const useCreateMessage = useMutation({
    mutationFn: createMessage,
  });

  return (
    <div className="flex h-full flex-auto flex-col bg-gray-50 p-6">
      <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-white p-4">
        <div className="mb-4 flex h-full flex-col overflow-x-auto">
          <div className="flex h-full flex-col">
            <div className="grid grid-cols-12 gap-y-2">
              {/* <div className="col-start-1 col-end-8 rounded-lg p-3">
                <div className="flex flex-row items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                    <div>Hey How are you today?</div>
                  </div>
                </div>
              </div> */}

              <Message />
            </div>
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

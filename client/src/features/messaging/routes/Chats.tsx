import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Chat, FetchChatsResponse, fetchChats } from '../api';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { Conversation } from '../components/Conversation';
import { useState } from 'react';
import { ConversationSummary } from '../components/ConversationSummary';

export const Chats = () => {
  const navigate = useNavigate();

  // const { chatId } = useParams();
  // if (chatId) {
  //   console.log('open selected chat');
  // }
  const [openChat, setOpenChat] = useState<undefined | Chat>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <Spinner></Spinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-y-4">
        <div className="">Oops.. Something went wront</div>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back to the portal
        </Button>
      </div>
    );
  }
  const { chats } = data;

  return (
    <div className="p-4">
      <div className="mx-auto grid h-[calc(100vh-100px)] max-w-screen-xl grid-cols-5 gap-4">
        <div className="con-span-2 rounded border">
          <h1 className="my-2 text-center text-gray-700">Conversations</h1>
          <div className="flex flex-col gap-y-1">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant="plain"
                className="!p-0"
                onClick={() => {
                  setOpenChat(chat);
                }}
              >
                <ConversationSummary chat={chat} />
              </Button>
            ))}
          </div>
        </div>
        <div className="col-span-4 rounded border">
          {!openChat ? (
            <div className="mt-10 flex items-center justify-center">
              Select one of the conversations to start messaging
            </div>
          ) : (
            <Conversation chat={openChat} />
          )}
        </div>
      </div>
    </div>
  );
};

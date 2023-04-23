import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchChats } from '../api';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { ConversationSummary } from '../components/ConversationSummary';
import { useAuth } from '@/hooks/useAuth';
import { SocketProvider } from '@/hooks/useMessagingSocket';
import { ChatBox } from '../components/ChatBox';

export const Chats = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const { persona } = useAuth();

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
  let openChat = null;
  if (chatId) {
    const chat = chats.find((chat) => chat.id === chatId);
    openChat = chat ?? null;
  }

  return (
    <SocketProvider persona={persona} chat={openChat}>
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
                    navigate(chat.id);
                  }}
                >
                  <ConversationSummary chat={chat} />
                </Button>
              ))}
            </div>
          </div>
          <ChatBox chat={openChat} />
        </div>
      </div>
    </SocketProvider>
  );
};

import { Chat } from '../api';
import { Conversation } from './Conversation';

export const ChatBox = ({ chat }: { chat: Chat | null }) => {
  return (
    <div className="col-span-4 rounded border">
      {!chat ? (
        <div className="mt-10 flex items-center justify-center">
          Select one of the conversations to start messaging
        </div>
      ) : (
        <Conversation chat={chat} />
      )}
    </div>
  );
};

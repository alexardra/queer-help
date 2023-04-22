import { AssistanceDetails } from '@/features/assistances/components/AssistanceDetails';
import { Chat } from '../api';

export const ConversationSummary = ({ chat }: { chat: Chat }) => {
  if (!chat.assistance) return <></>;

  return (
    <div className="cursor-pointer rounded border p-3 hover:bg-gray-50">
      <AssistanceDetails assistance={chat.assistance} />
    </div>
  );
};

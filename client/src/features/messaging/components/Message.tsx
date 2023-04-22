import { useAuth } from '@/hooks/useAuth';
import { MessageType } from '../api';

export const Message = ({ message }: { message: MessageType }) => {
  const { persona } = useAuth();
  if (persona === null) {
    return <></>;
  }

  const messageByPersona = message.senderId === persona.id;
  const positionClass = messageByPersona
    ? 'col-start-6 col-end-13'
    : 'col-start-1 col-end-8';

  return (
    <div className={`${positionClass} rounded-lg p-2`}>
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-purple-400 bg-purple-100 text-purple-800">
          A
        </div>
        <div className="relative mr-3 rounded-xl bg-purple-100 px-4 py-2 text-sm text-purple-800 shadow">
          <div>{message.text}</div>
        </div>
      </div>
    </div>
  );
};

import { useAuth } from '@/hooks/useAuth';
import { MessageType } from '../api';
import { classList } from '@/utils';

export const Message = ({ message }: { message: MessageType }) => {
  const { persona } = useAuth();

  if (persona === null) {
    return <></>;
  }

  const messageByPersona = message.senderId === persona.id;

  return (
    <div
      className={classList(
        'rounded-lg p-2',
        messageByPersona ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8',
      )}
    >
      <div
        className={classList(
          'flex items-center justify-start',
          messageByPersona ? 'flex-row-reverse' : 'flex-row',
        )}
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-purple-400 bg-purple-100 text-purple-800">
          A
        </div>
        <div
          className={classList(
            'relative rounded-xl bg-purple-100 px-4 py-2 text-sm text-purple-800 shadow',
            messageByPersona ? 'mr-3' : 'ml-3',
          )}
        >
          <div>{message.text}</div>
        </div>
      </div>
    </div>
  );
};

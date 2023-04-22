import { useParams } from 'react-router-dom';

export const Chat = () => {
  const { chatId } = useParams();

  if (chatId) {
    console.log('open selected chat');
  }

  return <div>Chat</div>;
};

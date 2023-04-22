import { NotFound } from '@/features/misc';
import { Route, Routes } from 'react-router-dom';
import { Portal, Profile } from '@/features/user';
import { UserLayout } from '@/features/user/components/UserLayout';
import { AssistanceCreate } from '@/features/assistances/routes/AssistanceCreate';
import { Assistance } from '@/features/assistances/routes/Asssistance';
import { Chats } from '@/features/messaging/routes/Chats';
import { ChatCreate } from '@/features/messaging/routes/ChatCreate';

const UserApp = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/portal" element={<Portal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assistance" element={<Assistance />} />
        <Route path="/assistance/create" element={<AssistanceCreate />} />
        <Route path="/chat" element={<Chats />} />
        <Route path="/chat/:chatId" element={<Chats />} />
        <Route path="/chat/create/:assistanceId" element={<ChatCreate />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </UserLayout>
  );
};

export const userRoutes = [
  {
    path: '/user/*',
    element: <UserApp />,
  },
];

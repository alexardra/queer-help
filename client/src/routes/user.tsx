import { NotFound } from '@/features/misc';
import { Route, Routes } from 'react-router-dom';
import { Portal, Profile } from '@/features/user';
import { UserLayout } from '@/features/user/components/UserLayout';
import { AssistanceCreate } from '@/features/assistances/routes/AssistanceCreate';

const UserApp = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/portal" element={<Portal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assistance/create" element={<AssistanceCreate />} />
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

import { Portal, NotFound } from '@/features/misc';
import { Profile } from '@/features/user';
import { Route, Routes } from 'react-router-dom';

const UserApp = () => {
  return (
    <div>
      <h1>Main layout - Admin App</h1>
      <Routes>
        <Route path="/portal" element={<Portal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export const userRoutes = [
  {
    path: '/user/*',
    element: <UserApp />,
  },
];

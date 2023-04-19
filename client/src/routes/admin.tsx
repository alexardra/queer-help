import { Dashboard, NotFound } from '@/features/misc';
import { Profile } from '@/features/user';
import { Route, Routes } from 'react-router-dom';

const AdminApp = () => {
  return (
    <div>
      <h1>Main layout - Admin App</h1>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export const adminRoutes = [
  {
    path: '/admin/*',
    element: <AdminApp />,
  },
];

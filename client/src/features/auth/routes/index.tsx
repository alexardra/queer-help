import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';

export const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/login" element={<Login personaType="user" />} />
      <Route path="/admin/login" element={<Login personaType="admin" />} />
    </Routes>
  );
};

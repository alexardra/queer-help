import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';
import { PersonaRoleTypes } from '../api';
import { NotFound } from '@/features/misc';
import { Header } from '@/components/Header';

export const AuthRoutes: React.FC = () => {
  return (
    <div className="flex flex-col items-stretch bg-purple-50">
      <Header />
      <Routes>
        <Route path="" element={<Navigate to="user/login" replace />} />
        <Route path="/user/register" element={<Register />} />
        <Route
          path="/user/login"
          element={<Login personaRole={PersonaRoleTypes.USER} />}
        />
        <Route
          path="/admin/login"
          element={<Login personaRole={PersonaRoleTypes.ADMIN} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';
import { PersonaRoleTypes } from '../api';

export const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<Register />} />
      <Route
        path="/user/login"
        element={<Login personaRole={PersonaRoleTypes.USER} />}
      />
      <Route
        path="/admin/login"
        element={<Login personaRole={PersonaRoleTypes.ADMIN} />}
      />
    </Routes>
  );
};

import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
  PersonaAuthResponse,
  PersonaRole,
  PersonaRoleTypes,
  loginAdmin,
  loginUser,
} from '../api';
import { LoginForm } from '../components/LoginForm';

type LoginProps = {
  personaRole: PersonaRole;
};

export const Login: React.FC<LoginProps> = ({ personaRole }: LoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginAction = {
    [PersonaRoleTypes.ADMIN]: loginAdmin,
    [PersonaRoleTypes.USER]: loginUser,
  }[personaRole];

  const nextRoute = {
    [PersonaRoleTypes.ADMIN]: '/dashboard',
    [PersonaRoleTypes.USER]: '/portal',
  }[personaRole];

  return (
    <div className="flex h-[calc(100vh-60px)] w-full items-center justify-center">
      <LoginForm
        loginPersona={loginAction}
        onSuccess={(authResponse: PersonaAuthResponse) => {
          window.localStorage.setItem('token', authResponse.token);
          void queryClient.invalidateQueries({ queryKey: ['auth'] });

          navigate(nextRoute);
        }}
      />
    </div>
  );
};

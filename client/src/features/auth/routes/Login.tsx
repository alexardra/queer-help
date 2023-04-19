import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { PersonaAuthResponse, loginAdmin, loginUser } from '../api';
import { PersonaType } from '../types';

import { LoginForm } from '../components/LoginForm';

type LoginProps = {
  personaType: PersonaType;
};

export const Login: React.FC<LoginProps> = ({ personaType }: LoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginAction = {
    admin: loginAdmin,
    user: loginUser,
  }[personaType];

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginForm
        loginPersona={loginAction}
        onSuccess={(authResponse: PersonaAuthResponse) => {
          window.localStorage.setItem('token', authResponse.token);
          void queryClient.invalidateQueries({ queryKey: ['auth'] });

          navigate('/dashboard');
        }}
      />
    </div>
  );
};

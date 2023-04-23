import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { PersonaAuthResponse, registerUser } from '../api';
import { RegisterForm } from '../components/RegisterForm';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col items-center justify-center gap-y-3">
      <h3 className="flex text-center text-xl font-semibold tracking-wider text-purple-700">
        Register
      </h3>
      <RegisterForm
        registerPersona={registerUser}
        onSuccess={(authResponse: PersonaAuthResponse) => {
          window.localStorage.setItem('token', authResponse.token);
          void queryClient.invalidateQueries({ queryKey: ['auth'] });

          navigate('/user/portal');
        }}
      />
    </div>
  );
};

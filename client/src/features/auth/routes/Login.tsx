import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { PersonaLoginResponse, loginUser } from '../api';
import { useQueryClient } from '@tanstack/react-query';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginForm
        loginPersona={loginUser}
        onSuccess={(loginResponse: PersonaLoginResponse) => {
          window.localStorage.setItem('token', loginResponse.token);
          void queryClient.invalidateQueries({ queryKey: ['auth'] });

          navigate('/app');
        }}
      />
    </div>
  );
};

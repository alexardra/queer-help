import { useNavigate } from 'react-router-dom';

import { PersonaAuthResponse, PersonaRole, PersonaRoleTypes } from '../api';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '@/hooks/useAuth';

type LoginProps = {
  personaRole: PersonaRole;
};

export const Login: React.FC<LoginProps> = ({ personaRole }: LoginProps) => {
  const navigate = useNavigate();
  const { userLogin, adminLogin } = useAuth();

  if (!userLogin || !adminLogin) return <></>;

  const loginAction = {
    [PersonaRoleTypes.ADMIN]: adminLogin,
    [PersonaRoleTypes.USER]: userLogin,
  }[personaRole];

  const nextRoute = {
    [PersonaRoleTypes.ADMIN]: '/admin/dashboard',
    [PersonaRoleTypes.USER]: '/user/portal',
  }[personaRole];

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col items-center justify-center gap-y-3">
      <h3 className="flex text-center text-xl font-semibold tracking-wider text-purple-700">
        Login
      </h3>
      <LoginForm
        loginPersona={loginAction}
        onSuccess={(authResponse: PersonaAuthResponse) => {
          window.localStorage.setItem('token', authResponse.token);

          navigate(nextRoute);
        }}
      />
    </div>
  );
};

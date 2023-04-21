import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { PersonaRoleTypes } from '@/features/auth/api';

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const { persona, isLoading } = useAuth();

  if (isLoading) return <></>;

  if (persona !== null) {
    const home = {
      [PersonaRoleTypes.ADMIN]: {
        title: 'Go to Dashboard',
        route: '/admin/dashboard',
      },
      [PersonaRoleTypes.USER]: { title: 'Go to Portal', route: '/user/portal' },
    }[persona.role];

    return (
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          navigate(home.route);
        }}
      >
        {home.title}
      </Button>
    );
  }

  return (
    <>
      {' '}
      <Button
        variant="plain"
        size="sm"
        onClick={() => {
          navigate('/auth/user/login');
        }}
      >
        Login in
      </Button>
      <Button
        variant="primary"
        size="sm"
        className=" text-white"
        onClick={() => {
          navigate('/auth/user/register');
        }}
      >
        Join
      </Button>
    </>
  );
};

export const Landing: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-stretch bg-purple-100">
      <Header>
        <div className="flex items-center gap-x-2">
          <HeaderNavigation />
        </div>
      </Header>
      <main></main>
    </div>
  );
};

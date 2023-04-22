import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { PersonaRoleTypes } from '@/features/auth/api';

const HeaderNavigation = () => {
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
      <Link to={home.route}>
        <Button variant="primary" size="sm">
          {home.title}
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Link to="/auth/user/login">
        <Button variant="plain" size="sm">
          Login in
        </Button>
      </Link>
      <Link to="auth/user/register">
        <Button variant="primary" size="sm" className=" text-white">
          Join
        </Button>
      </Link>
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

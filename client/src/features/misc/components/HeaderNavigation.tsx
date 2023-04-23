import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { PersonaRoleTypes } from '@/features/auth/api';

export const HeaderNavigation = () => {
  const { persona, logout } = useAuth();

  if (persona !== null) {
    const home = {
      [PersonaRoleTypes.ADMIN]: {
        title: 'Go to Dashboard',
        route: '/admin/dashboard',
      },
      [PersonaRoleTypes.USER]: { title: 'Go to Portal', route: '/user/portal' },
    }[persona.role];

    return (
      <>
        <Link to={home.route}>
          <Button variant="primary" size="sm">
            {home.title}
          </Button>
        </Link>
        <Button
          variant="inverse"
          size="sm"
          onClick={() => {
            if (logout) logout();
          }}
        >
          Logout
        </Button>
      </>
    );
    ``;
  }

  return (
    <>
      <Link to="/auth/user/login">
        <Button variant="inverse" size="sm">
          Login in
        </Button>
      </Link>
      <Link to="auth/user/register">
        <Button variant="primary" size="sm" className=" text-white">
          Sign up
        </Button>
      </Link>
    </>
  );
};

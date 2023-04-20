import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { PersonaRoleTypes } from '@/features/auth/api';

export const LandingHeader: React.FC = () => {
  const navigate = useNavigate();
  const { persona } = useAuth();

  const handleStart = (authRoute: string) => {
    if (persona) {
      const nextRoute = {
        [PersonaRoleTypes.ADMIN]: '/admin/dashboard',
        [PersonaRoleTypes.USER]: '/user/portal',
      }[persona.role];
      navigate(nextRoute);
    } else {
      navigate(authRoute);
    }
  };

  return (
    <header className="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800 lg:px-6">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <Button
          variant="plain"
          className="px-0 text-white"
          onClick={() => {
            navigate('/');
          }}
        >
          Querrand
        </Button>
        <div className="flex items-center gap-x-2">
          <Button
            variant="plain"
            size="sm"
            className="text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={() => {
              handleStart('/auth/user/login');
            }}
          >
            Login in
          </Button>
          <Button
            variant="primary"
            size="sm"
            className=" text-white"
            onClick={() => {
              handleStart('/auth/user/register');
            }}
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
};

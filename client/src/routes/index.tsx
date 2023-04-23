import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { userRoutes } from './user';
import { adminRoutes } from './admin';
import { publicRoutes } from './public';

import { useAuth } from '@/hooks/useAuth';
import { PersonaRoleTypes } from '@/features/auth/api';
import { useQuery } from '@tanstack/react-query';

export const AppRoutes = () => {
  const { persona, loadPersona } = useAuth();

  useQuery({
    queryKey: ['auth', 'me'],
    queryFn: loadPersona,
    retry: false,
  });

  const commonRoutes = [{ path: '/', element: <Landing /> }];
  let allRoutes = [...publicRoutes, ...commonRoutes];

  if (persona) {
    const protectedRoutes = {
      [PersonaRoleTypes.ADMIN]: adminRoutes,
      [PersonaRoleTypes.USER]: userRoutes,
    }[persona.role];
    allRoutes = [...allRoutes, ...protectedRoutes];
  }

  const element = useRoutes(allRoutes);
  return <>{element}</>;
};

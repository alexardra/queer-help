import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

import useAuth from '@/hooks/useAuth';

export const AppRoutes = () => {
  const { persona } = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  // TODO: instead set up redirection route
  const routes = persona ? [...protectedRoutes, ...publicRoutes] : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};

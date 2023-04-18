import { RouteObject } from 'react-router-dom';
import { Landing } from '@/features/misc';
import { createBrowserRouter } from 'react-router-dom';

import { publicRoutes } from './public';

const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = publicRoutes;
  return [...routes, ...commonRoutes] as RouteObject[];
};

const router = createBrowserRouter(AppRoutes());

export const BrowserRouter = router;

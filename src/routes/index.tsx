import { useRoutes } from 'react-router-dom';

// import { useAuth } from '@/features/auth';
import { LandingRoute } from '@/features/landing';

// import { protectedRoutes } from './protected';
// import { publicRoutes } from './public';

export const AppRoutes = () => {
  // const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <LandingRoute /> }];

  // const routes = auth.user ? protectedRoutes : publicRoutes;

  // const element = useRoutes([...routes, ...commonRoutes]);
  const element = useRoutes([...commonRoutes]);

  return element;
};

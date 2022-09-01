import { useRoutes, useLocation } from 'react-router-dom';

// import { useAuth } from '@/features/auth';
import { Landing } from '@/features/misc';

// import { protectedRoutes } from './protected';
// import { publicRoutes } from './public';

export const AppRoutes = () => {
  // const auth = useAuth();
  const { pathname, hash } = useLocation();

  let sessionID;

  if (import.meta.env.MODE === 'development') {
    [, sessionID] = pathname.split('/');
  }

  if (import.meta.env.MODE === 'production') {
    [, sessionID] = hash.split('/');
  }

  const commonRoutes = [{ path: '/:sessionID', element: <Landing sessionID={sessionID} /> }];

  // const routes = auth.user ? protectedRoutes : publicRoutes;

  // const element = useRoutes([...routes, ...commonRoutes]);
  const element = useRoutes([...commonRoutes]);

  return element;
};

// development
// production

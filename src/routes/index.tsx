import { useRoutes } from 'react-router-dom';

import { LandingLayout } from '@/components/Layout';
import { useAuth } from '@/features/auth';
import { Landing } from '@/features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();
  console.log('appRoute');

  const commonRoutes = [
    {
      path: '/landing',
      element: (
        <LandingLayout>
          <Landing />
        </LandingLayout>
      ),
    },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
};

// development
// production

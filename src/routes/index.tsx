import { useRoutes } from 'react-router-dom';

import { LandingLayout } from '@/components/Layout';
import { useAuth } from '@/features/auth';
import { Landing } from '@/features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();

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

  const element = useRoutes([...commonRoutes, ...routes]);

  return element;
};

// development
// production

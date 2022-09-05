import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { Loading } from '@/components/Loading';
import { useResetUrl } from '@/hooks';
import { lazyImport } from '@/utils/lazyImport';

const { BuyRoute } = lazyImport(() => import('@/features/buy'), 'BuyRoute');
const { Overview } = lazyImport(() => import('@/features/misc'), 'Overview');

const ProtectRest = () => {
  console.log('protect reset');
  useResetUrl('home');
  return <Loading />;
};

const ProtectRoute = () => {
  console.log('protect');
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: 'home',
    element: <ProtectRoute />,
    children: [
      { path: '', element: <Overview /> },
      { path: 'buy', element: <BuyRoute /> },
    ],
  },
  {
    path: '*',
    element: <ProtectRest />,
  },
];

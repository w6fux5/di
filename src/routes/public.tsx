import { AuthLayout } from '@/components/Layout';
import { Loading } from '@/components/Loading';
import { useResetUrl } from '@/hooks/useResetUrl';
import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const PublicRest = () => {
  console.log('pub reset');
  useResetUrl('auth');
  return <Loading />;
};

export const publicRoutes = [
  {
    path: '/auth/*',
    element: (
      <AuthLayout>
        <AuthRoutes />
      </AuthLayout>
    ),
  },
  {
    path: '*',
    element: <PublicRest />,
  },
];

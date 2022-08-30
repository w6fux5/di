import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { useAuth } from '@/features/auth';

// import { MainLayout } from '@/components/Layout';
// import { lazyImport } from '@/utils/lazyImport';
const ProtectRoute = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

const Home = () => {
  const { refetchUser } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={() => refetchUser()}>
        refetch user
      </button>
    </div>
  );
};

export const protectedRoutes = [
  {
    path: '/home',
    element: <ProtectRoute />,
    children: [
      { path: '', element: <Home /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" />,
  },
];

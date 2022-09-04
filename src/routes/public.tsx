import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import { AuthLayout } from '@/components/Layout';
import { NotFound } from '@/components/NotFound';
import { lazyImport } from '@/utils/lazyImport';

import { urlParamsKey, getParamsFromUrl } from '../utils/urlParse';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const PublicRest = () => {
  const sessionID = getParamsFromUrl(urlParamsKey.session_id);

  const { width, height } = useWindowSize();

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/auth?${urlParamsKey.session_id}=${sessionID}`);
  };

  if (!sessionID) {
    return <NotFound />;
  }

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10rem',
        fontSize: '3rem',
      }}
    >
      <h1>沒有登入</h1>
      <Button type="primary" onClick={onClick}>
        重新登入
      </Button>
    </div>
  );
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

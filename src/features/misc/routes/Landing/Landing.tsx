import { Navigate } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { usePaymentInfo } from '@/features/user';
import { getParamsFromUrl, urlParamsKey } from '@/utils/urlParse';

import { Error } from '../../components/Error';

export const Landing = () => {
  const { isSuccess, error, isError } = usePaymentInfo();

  // if (isError && typeof error === 'string') {
  //   return <Error title={error} />;
  // }

  if (isSuccess) {
    const sessionID = getParamsFromUrl('session_id');
    return <Navigate to={`/auth?${urlParamsKey.session_id}=${sessionID}`} />;
  }

  return (
    <div>
      <Loading tip="正在獲取訂單..." />
    </div>
  );
};

import { Navigate } from 'react-router-dom';

import { Loading } from '@/components/Loading';
// import { ChatWidget } from '@/features/chatWidget';
import { usePaymentInfo } from '@/features/user';
import { getParamsFromUrl, urlParamsKey } from '@/utils/urlParse';

export const Landing = () => {
  const { isSuccess } = usePaymentInfo();

  if (isSuccess) {
    const sessionID = getParamsFromUrl('session_id');
    return <Navigate to={`/auth?${urlParamsKey.session_id}=${sessionID}`} />;
  }

  return <Loading tip="正在獲取訂單..." />;
};

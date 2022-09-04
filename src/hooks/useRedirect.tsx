import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getParamsFromUrl, urlParamsKey } from '../utils/urlParse';

type RedirectProps = {
  location: '/home' | '/auth';
};

export const useRedirect = ({ location }: RedirectProps) => {
  const navigate = useNavigate();
  const sessionID = getParamsFromUrl(urlParamsKey.session_id);

  const redirect = useCallback(
    (params?: 'buy' | 'transfer') => {
      if (params) {
        navigate(`${location}/${params}?${urlParamsKey.session_id}=${sessionID}`);
      } else {
        navigate(`${location}?${urlParamsKey.session_id}=${sessionID}`);
      }
    },
    [sessionID, location, navigate],
  );

  return {
    redirect,
  };
};

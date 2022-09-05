import { useState, useEffect, useCallback } from 'react';

import { useWebsocket } from '@/hooks/useWebsocket';
import storage from '@/utils/storage';

import { OrderDataTypes, OrderWebSocketResponse } from '../types';

const URL = 'ws_orderstatus.ashx';

export const useBuyWebSocket = () => {
  const [receivedData, setReceivedData] = useState<OrderDataTypes>();
  const [socketUrl, setSocketUrl] = useState('');
  const { lastJsonMessage, connectionStatus } = useWebsocket({ url: socketUrl });

  const userToken = storage.getToken();

  const changeSocketUrl = useCallback(
    (existsOrderToken: string) => {
      const url = `${URL}?login_session=${userToken}&order_token=${existsOrderToken}`;
      setSocketUrl(url);
    },
    [userToken],
  );

  useEffect(() => {
    if (!lastJsonMessage) return;
    const { data } = lastJsonMessage as OrderWebSocketResponse;
    if (!data) return;
    setReceivedData(data);
  }, [lastJsonMessage]);

  return {
    changeSocketUrl,
    receivedData,
    connectionStatus,
  };
};

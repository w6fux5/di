import { useCallback, useEffect } from 'react';

import { Loading } from '@/components/Loading';
import { Matching, Result, Wait, Error } from '@/features/misc';
import { useResetUrl } from '@/hooks/useResetUrl';

import { useExRate } from '../../exRate/api/checkExRate';
import { useBankData } from '../../user/api/getBankData';
import { BuyForm, Payment } from '../components';
import { useBuyWebSocket } from '../hooks/useBuyWebSocket';

export const Buy = () => {
  const { changeSocketUrl, receivedData } = useBuyWebSocket();
  const { setOrderToken, orderToken } = useResetUrl('home/buy');

  const { data: bankData, error: bankDataError } = useBankData();
  const { data: exRateData, error: exRateError } = useExRate();

  const onSuccess = useCallback(
    (orderTokenFromServer: string) => {
      setOrderToken(orderTokenFromServer);
      changeSocketUrl(orderTokenFromServer);
    },
    [setOrderToken, changeSocketUrl],
  );

  useEffect(() => {
    if (!orderToken) return;
    changeSocketUrl(orderToken);
  }, [orderToken, changeSocketUrl]);

  if (bankData && !bankData.some((el) => el.User_BankStatus === 101)) {
    return <Error title="目前沒有有效的銀行帳號可以使用" action={() => {}} actionType="kyc" />;
  }

  if (bankDataError || exRateError) {
    const message = (bankDataError as string) || (exRateError as string);
    return <Error title={message} />;
  }

  if (exRateData && bankData) {
    return <BuyForm onSuccess={onSuccess} />;
  }

  if (receivedData) {
    const { Order_StatusID: statusID, Tx_HASH: hash, UsdtAmt: usdt, D2: price } = receivedData;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
        {statusID === 31 && <Matching usdt={usdt} price={price} />}
        {statusID === 33 && <Payment receivedData={receivedData} />}
        {statusID === 34 && <Wait hash={hash} />}
        {statusID === 1 && <Result status="success" type="完成" hash={hash} />}
        {statusID === 98 && <Result status="error" type="超時" hash={hash} />}
        {statusID === 99 && <Result status="error" type="取消" hash={hash} />}
        {statusID === 35 && <Result status="warning" type="申訴" hash={hash} />}
      </div>
    );
  }

  return <Loading />;
};

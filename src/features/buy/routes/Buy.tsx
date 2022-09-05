/**
 * @URL /home/buy?session_id=1234 => /home/buy?session_id=1234&buy_token=abcd
 *
 * @description
 * 1.call bankData 和 exRate api
 * 2.拿到 bankData和exRate後 render <BuyForm>
 *   a.判斷 bankData 是否有通過實名驗證的銀行帳號 => User_BankStatus === 101
 * 3.bankForm 提交成功後拿到 buy order token
 *   a.將 buy order token 放到 url /home/buy?session_id=1234&buy_token=abcd
 *   b.使用 buy order token 連接 websocket
 * 4.接收 websocket 回傳交易數據，更新ui
 *
 * @note
 * 1.webSocket 一進來就會嘗試連線，url 為空字串，拿到buy order token 更改 url，才能成功連線
 */

import { useCallback, useEffect } from 'react';

import { Loading } from '@/components/Loading';
import { Matching, Result, Wait } from '@/features/misc';
import { useResetUrl } from '@/hooks/useResetUrl';

import { useExRate } from '../../exRate/api/checkExRate';
import { useBankData } from '../../user/api/getBankData';
import { BuyForm, Payment } from '../components';
import { useBuyWebSocket } from '../hooks/useBuyWebSocket';

export const Buy = () => {
  const { changeSocketUrl, receivedData, connectionStatus } = useBuyWebSocket();
  const { setOrderToken, orderToken } = useResetUrl('home/buy');

  const { data: bankData } = useBankData();
  const { data: exRateData } = useExRate();

  const onSuccess = useCallback(
    (orderTokenFromServer: string) => {
      setOrderToken(orderTokenFromServer);
      changeSocketUrl(orderTokenFromServer);
    },
    [setOrderToken, changeSocketUrl],
  );

  console.log(receivedData);

  useEffect(() => {
    if (!orderToken) return;
    changeSocketUrl(orderToken);
  }, [orderToken, changeSocketUrl]);

  if (bankData && !bankData.some((el) => el.User_BankStatus === 101)) {
    alert('目前還沒有帳號通過實名驗證');
  }

  if (receivedData) {
    const { Order_StatusID: statusID, Tx_HASH: hash, UsdtAmt: usdt, D2: price } = receivedData;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
        {statusID === 31 && <Matching usdt={usdt} price={price} />}
        {statusID === 33 && <Payment receivedData={receivedData} />}
        {statusID === 34 && <Wait hash={hash} />}
        {statusID === 1 && <Result status="success" type="購買完成" hash={hash} />}
        {statusID === 98 && <Result status="error" type="超時" hash={hash} />}
        {statusID === 99 && <Result status="error" type="取消" hash={hash} />}
        {statusID === 35 && <Result status="warning" type="申訴" hash={hash} />}
      </div>
    );
  }

  if (exRateData && bankData && connectionStatus !== 'Connecting') {
    return <BuyForm onSuccess={onSuccess} />;
  }

  return <Loading />;
};

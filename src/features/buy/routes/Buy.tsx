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

import { message } from 'antd';
import { useCallback, useEffect } from 'react';

import { Loading } from '@/components/Loading';
import { useAuth } from '@/features/auth';
import { ChatWidget } from '@/features/chatWidget';
import { useExRate } from '@/features/exRate';
import { Matching, Result, Wait } from '@/features/misc';
import { useBankData, useCheckBalance, usePaymentInfo } from '@/features/user';
import { useResetUrl } from '@/hooks/useResetUrl';

import { BuyForm, Payment } from '../components';
import { useBuyWebSocket } from '../hooks/useBuyWebSocket';

export const Buy = () => {
  const { user } = useAuth();

  const { changeSocketUrl, receivedData, connectionStatus } = useBuyWebSocket();
  const { setOrderToken, orderToken } = useResetUrl('home/buy');

  const { data: balance } = useCheckBalance();
  const { data: paymentInfo } = usePaymentInfo({ config: { cacheTime: 0 } });

  const agt = balance?.AgtBalance || 0;
  const usdtAmt = paymentInfo?.USDTAmt || 0;
  const finalBalance = balance ? agt - usdtAmt : undefined;

  const { data: bankData } = useBankData();
  const { data: exRateData } = useExRate();

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
    message.error('目前還沒有實名驗證');
  }

  const showForm =
    finalBalance !== undefined &&
    balance &&
    paymentInfo &&
    exRateData &&
    bankData &&
    connectionStatus !== 'Connecting';

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
        {statusID === 35 && <Result status="warning" type="申訴中" hash={hash} />}
        {user && <ChatWidget user={user} />}
      </div>
    );
  }

  if (showForm) {
    return <BuyForm finalBalance={finalBalance} onSuccess={onSuccess} />;
  }

  return <Loading />;
};

/**
 * @URL /home?session_id=1234 => /home/buy?session_id=1234
 *
 * @description
 * 1.判斷 url 是否有 session_id
 *  a.如果有 session_id 則呼叫payment info api
 *  b.沒有到話，呼叫 api 會報錯，跳轉到錯誤頁面
 *
 * 2.判斷 url 是否有 buy_token
 *  a.如果頁面一進來，url 已經有 buy_token，跳轉到 <buyRoute>，參考 note.1
 *  b.如果沒有，則執行下面步驟
 *
 * 3.呼叫 api 獲取交易資訊和使用者餘額(useCheckBalance, usePaymentInfo)，
 *   成功後顯示交易資訊 <TransactionInfo>
 *
 * 4.交易確認後，<TransactionInfo> 判斷交易類型 (轉帳 or 購買)
 *  a.轉帳 => open <TransferConfirm> modal, 點擊確認，call (handleTransfer)，
 *    執行轉帳，轉帳成功 render <Result>
 *  b.購買 => call (goToTrade) 跳轉頁面 <buyRoute> /home/buy?session_id=1234
 *
 * @note
 *  1./home?session_id=1234&buy_token=abcd => /home/buy?session_id=1234&buy_token=abcd
 */

import { useEffect, useCallback, useState } from 'react';

import { Loading } from '@/components/Loading';
import { TransferConfirm, useOrderTransfer } from '@/features/transfer';
import { TransactionInfo, useCheckBalance, usePaymentInfo } from '@/features/user';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRedirect } from '@/hooks/useRedirect';

import { Result } from '../../components/Result';

type GoToTradeProps = 'buy' | 'transfer';

export const Overview = () => {
  const { xs } = useMediaQuery();
  const { redirect, sessionID, buyOrderToken } = useRedirect({ location: '/home' });

  const [openModal, setOpenModal] = useState<boolean>(false);

  // user 餘額 api
  const { data: balance, isLoading: balanceLoading } = useCheckBalance();

  // 付款資訊 api
  const { data: paymentInfo, isLoading: paymentInfoLoading } = usePaymentInfo({
    config: { cacheTime: 0, staleTime: 0 },
  });

  // 轉帳 api
  const {
    refetch,
    isLoading: transferLoading,
    data: transferData,
  } = useOrderTransfer({
    config: { enabled: false },
    data: { dpOrderSession: sessionID },
  });

  const goToTrade = useCallback(
    (type: GoToTradeProps) => {
      redirect(type);
    },
    [redirect],
  );

  const handleTransfer = async () => {
    if (!sessionID) return;
    await refetch();
    setOpenModal(false);
  };

  useEffect(() => {
    if (!buyOrderToken) return;
    goToTrade('buy');
  }, [buyOrderToken, goToTrade]);

  if (paymentInfoLoading || balanceLoading || !paymentInfo) {
    return <Loading />;
  }

  if (transferData) {
    const { order_token: token } = transferData;
    return <Result orderToken={token} type="轉帳完成" status="success" />;
  }

  return (
    <div style={{ padding: xs ? '10px' : 0 }}>
      <TransferConfirm
        isOpen={openModal}
        setIsOpen={setOpenModal}
        paymentInfo={paymentInfo}
        balance={balance}
        handleTransfer={handleTransfer}
        transferLoading={transferLoading}
      />
      <TransactionInfo
        goToTrade={goToTrade}
        balance={balance}
        paymentInfo={paymentInfo}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

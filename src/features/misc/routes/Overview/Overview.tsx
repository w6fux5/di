import { useEffect, useCallback, useState } from 'react';

import { Loading } from '@/components/Loading';
import { TransferConfirm } from '@/features/transfer';
import { TransactionInfo, useCheckBalance, usePaymentInfo } from '@/features/user';
import { useRedirect } from '@/hooks/useRedirect';
import { getParamsFromUrl, ParamsProps, urlParamsKey } from '@/utils/urlParse';

import { useOrderTransfer } from '../../../transfer/api/orderTransfer';
import { Error } from '../../components/Error';
import { Result } from '../../components/Result';

type GoToTradeProps = 'buy' | 'transfer';

export const Overview = () => {
  const { redirect } = useRedirect({ location: '/home' });

  const [openModal, setOpenModal] = useState<boolean>(false);

  const sessionID = getParamsFromUrl(urlParamsKey.session_id as ParamsProps);
  const buyOrderTokenFromUrl = getParamsFromUrl(urlParamsKey.buy_token as ParamsProps);

  const { data: balance, error: balanceError, isLoading: balanceLoading } = useCheckBalance();

  // 付款資訊 api
  const {
    data: paymentInfo,
    error: paymentInfoError,
    isLoading: paymentInfoLoading,
  } = usePaymentInfo();

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
    if (!buyOrderTokenFromUrl) return;
    goToTrade('buy');
  }, [buyOrderTokenFromUrl, goToTrade]);

  if (paymentInfoLoading || balanceLoading) {
    return <Loading />;
  }

  if (!sessionID || paymentInfoError || balanceError) {
    const message = balanceError || paymentInfoError || 'session 錯誤！';
    return <Error title={`${message}`} />;
  }

  if (transferData) {
    return <Result type="完成" hash={transferData.order_token} status="success" />;
  }

  return (
    <>
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
      {/* <Button onClick={() => setOpenModal((prev) => !prev)}>click</Button> */}
    </>
  );
};

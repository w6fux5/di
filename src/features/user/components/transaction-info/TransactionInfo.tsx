import { Button, Empty } from 'antd';

import { CheckBalanceTypes, PaymentInfoTypes } from '../../api';

import styles from './TransactionInfo.module.less';

interface TransactionInfoProps {
  goToTrade: (type: 'buy' | 'transfer') => void;
  balance?: CheckBalanceTypes;
  paymentInfo?: PaymentInfoTypes;
  setOpenModal: (isShow: boolean) => void;
}

const defaultProps = {
  balance: null,
  paymentInfo: null,
};

export const TransactionInfo = ({
  goToTrade,
  balance,
  paymentInfo,
  setOpenModal,
}: TransactionInfoProps) => {
  const agt = balance?.AgtBalance || 0;
  const usdtAmt = paymentInfo?.USDTAmt || 0;
  const finalBalance = agt - usdtAmt;

  if (!balance || !paymentInfo) {
    return <Empty description="沒有數據" />;
  }

  return (
    <div style={{ fontSize: '1.2rem' }} className={styles.paymentBlock}>
      <div style={{ marginBottom: '1rem' }} className={styles.paymentBody}>
        <div>可提餘額(USDT)： {balance?.AgtBalance}</div>
        <div>支付數量(USDT)： {paymentInfo?.USDTAmt}</div>
        <div>結餘： {finalBalance}</div>
        {/* <div>結餘(USDT)： {balance}</div> */}
        <div>訂單成立時間： {paymentInfo?.RequestDate}</div>
        <div>TRC20轉帳地址：</div>
        <div>{paymentInfo?.WalletAddress}</div>
      </div>

      {finalBalance < 0 ? (
        <Button onClick={() => goToTrade('buy')} type="primary">
          餘額不足，前往買幣
        </Button>
      ) : (
        <Button onClick={() => setOpenModal(true)} type="primary">
          送出
        </Button>
      )}
    </div>
  );
};

TransactionInfo.defaultProps = defaultProps;

/* <section className={styles.bottom}>
<div className={`${styles.card} ${styles['card-padding']}`}>
  <div className={styles.title}>訂單資訊</div>
  <div className={styles['info-box']}>
    <span>支付數量(USDT)：</span>
    <span>1,0000</span>
  </div>

  <div className={styles['info-box']}>
    <span>訂單成立時間：</span>
    <span>2022/08/25 13:17:53</span>
  </div>

  <div className={styles['info-box']}>
    <span>TRC20轉帳地址：</span>
    <span>TA5146zxas446546asd4asd4qw6e46z251xc</span>
  </div>

  <p> 請在訂單有效時間內完成送出，如已失效請重新申請支付。</p>
  {!user?.login_session ? (
    <Button disabled type="primary" block>
      登入後付款
    </Button>
  ) : (
    <Button onClick={() => setShowRemind(true)} type="primary" block>
      確認付款
    </Button>
  )}
</div>
</section> */

/* <RemindWindow
        title="交易款項將從您的錢包轉出，請再次確認，確保交易安全。"
        bodyText={bodyText}
        visible={showModal}
        setVisible={setShowModal}
        confirmClick={() => goToTrade('transfer')}
        cancel
      /> */

// const bodyText = [
//   { id: nanoid(), title: '支付數量(USDT)', content: paymentInfo?.USDTAmt },
//   { id: nanoid(), title: '結餘(USDT):', content: remaining },
//   { id: nanoid(), title: '轉帳地址', content: paymentInfo?.WalletAddress },
// ];

import { Button } from 'antd';

import { useCheckBalance, usePaymentInfo } from '../../api';

import styles from './TransactionInfo.module.less';

export const TransactionInfo = () => {
  const { data: balance } = useCheckBalance();
  const { data: paymentInfo } = usePaymentInfo();

  if (!balance || !paymentInfo) {
    return <h1 style={{ color: 'white' }}>Loading..</h1>;
  }

  const agt = balance?.AgtBalance || 0;
  const usdtAmt = paymentInfo?.USDTAmt || 0;
  const remaining = agt - usdtAmt;

  return (
    <div style={{ fontSize: '1.2rem' }} className={styles.paymentBlock}>
      <div style={{ marginBottom: '1rem' }} className={styles.paymentBody}>
        <div>可提餘額(USDT)： {balance?.AgtBalance}</div>
        <div>支付數量(USDT)： {paymentInfo?.USDTAmt}</div>
        <div>結餘(USDT)： {remaining}</div>
        <div>訂單成立時間： {paymentInfo?.RequestDate}</div>
        <div>TRC20轉帳地址：</div>
        <div>{paymentInfo?.WalletAddress}</div>
      </div>

      {Math.sign(remaining) === -1 ? (
        <Button type="primary">餘額不足，前往買幣</Button>
      ) : (
        <Button type="primary">送出</Button>
      )}
    </div>
  );
};

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

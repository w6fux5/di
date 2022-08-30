import { Button } from 'antd';
import React from 'react';

import logo from '@/assets/88u_logo.png';
import { LandingLayout } from '@/components/Layout';

import styles from './Landing.module.less';
import { LandingLoginForm } from './LandingLoginForm';

export const Landing = () => {
  return (
    <LandingLayout>
      <section className={styles.top}>
        <div className={`${styles.card} ${styles['card-padding']}`}>
          <img className={styles.logo} src={logo} alt="88u logo" />
          <div style={{ fontSize: '1.5rem' }}>使用 88U ASIA 支付</div>
          <div style={{ margin: '5px 0 2rem 0' }}>簡易 | 快速 | 24H即時交易到帳</div>
          <LandingLoginForm onSuccess={() => console.log('success')} />
        </div>
      </section>

      <section className={styles.bottom}>
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

          <Button disabled type="primary" block>
            登入後付款
          </Button>
        </div>
      </section>
    </LandingLayout>
  );
};

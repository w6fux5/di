import React from 'react';
import { useWindowSize } from 'react-use';

import logo from '@/assets/88u_logo.png';

import styles from './AuthLayout.module.less';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { width, height } = useWindowSize();

  return (
    <main style={{ width, height }} className={styles.container}>
      <div className={styles.content}>
        <img className={styles.logo} src={logo} alt="88u logo" />

        <div style={{ fontSize: '1.5rem' }}>使用 88U ASIA 支付</div>

        <div style={{ margin: '5px 0 2rem 0' }}>簡易 | 快速 | 24H即時交易到帳</div>

        {children}
      </div>
    </main>
  );
};

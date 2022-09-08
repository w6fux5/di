import React from 'react';
import { useWindowSize } from 'react-use';

import styles from './AuthLayout.module.less';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { width, height } = useWindowSize();

  return (
    <section id="auth-layout" style={{ width, height }} className={styles.container}>
      <div style={{ backgroundColor: '' }} className={styles.content}>
        {children}
      </div>
    </section>
  );
};

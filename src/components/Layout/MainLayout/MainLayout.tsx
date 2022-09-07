import React from 'react';
import { useWindowSize } from 'react-use';

import styles from './MainLayout.module.less';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { width, height } = useWindowSize();

  return (
    <main id="main-layout" style={{ width, height }} className={styles.container}>
      {children}
    </main>
  );
};

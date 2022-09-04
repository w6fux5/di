import React from 'react';
import { useWindowSize } from 'react-use';

import styles from './MainLayout.module.less';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { width, height } = useWindowSize();

  return (
    <div style={{ width, height }} className={styles.container}>
      {children}
    </div>
  );
};

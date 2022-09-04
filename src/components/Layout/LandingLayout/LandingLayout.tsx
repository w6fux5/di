import { ReactNode } from 'react';
import { useWindowSize } from 'react-use';

import styles from './LandingLayout.module.less';

type LandingLayoutProps = {
  children: ReactNode;
};

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  const { width, height } = useWindowSize();
  return (
    <div style={{ width, height }} className={styles.container}>
      {children}
    </div>
  );
};

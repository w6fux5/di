import React from 'react';
import { useWindowSize } from 'react-use';

type LayoutProps = {
  children: React.ReactNode;
};

export const LandingLayout = ({ children }: LayoutProps) => {
  const { width, height } = useWindowSize();
  return <div style={{ width, height, backgroundColor: '#f2f2f2' }}>{children}</div>;
};

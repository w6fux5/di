import { createBreakpoint } from 'react-use';

/**
 * @returns 
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
 */

export const useBreakPoint = () => {
  const breakPointFn = createBreakpoint({
    xxs: 330,
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  });

  const breakPoint = breakPointFn();

  return { breakPoint };
};

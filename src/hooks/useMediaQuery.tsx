import { useMedia } from 'react-use';

/**
 * 
 * @returns 
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
 */

export const useMediaQuery = () => {
  const xs = useMedia('(max-width: 480px)');
  const sm = useMedia('(max-width: 576px)');
  const md = useMedia('(max-width: 768px)');
  const lg = useMedia('(max-width: 992px)');
  const xl = useMedia('(max-width: 1200px)');
  const xxl = useMedia('max-width: 1600px)');
  return {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};

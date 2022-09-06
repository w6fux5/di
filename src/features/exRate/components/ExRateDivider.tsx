import { Divider } from 'antd';

import { useExRate } from '../api/checkExRate';

export const dividerStyles = {
  color: '#bfbfbf',
  borderColor: 'blue',
  fontSize: '8px',
  marginTop: '2.5rem',
};

export const ExRateDivider = () => {
  const { data: exRateData } = useExRate();
  const { RMB_BUY: rate } = exRateData || {};
  return (
    <Divider style={{ ...dividerStyles }} orientation="left">
      {`匯率: ${rate}`}
    </Divider>
  );
};

import { Button, Result as AntdResult } from 'antd';
import { useWindowSize } from 'react-use';

import { useError } from '../../hooks/useError';

import styles from './index.module.less';

export const Error = () => {
  const { width, height } = useWindowSize();
  const { message, code, hasAction, actionHandler, btnText } = useError();

  const titleEl = <span>{message}</span>;
  const subTitleEl = <span>Error Code: {code}</span>;
  const btnEl = (
    <Button type="primary" onClick={actionHandler}>
      {btnText}
    </Button>
  );

  return (
    <section className={styles.container} style={{ height, width }}>
      <AntdResult
        className={styles.card}
        status="error"
        title={titleEl}
        subTitle={subTitleEl}
        extra={hasAction && btnEl}
      />
    </section>
  );
};

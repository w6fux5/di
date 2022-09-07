import { Button, Result as AntdResult } from 'antd';
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useWindowSize } from 'react-use';

import { useError } from '../../hooks/useError';

import styles from './index.module.less';

export const Error = () => {
  const { width, height } = useWindowSize();
  const { message, code, hasAction, actionHandler, btnText } = useError();

  const [show, setShow] = useState(false);

  const titleEl = <span>{message}</span>;
  const subTitleEl = <span>Error Code: {code}</span>;
  const btnEl = (
    <Button type="primary" onClick={actionHandler}>
      {btnText}
    </Button>
  );

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, []);

  return (
    <section id="error-layout" className={styles.container} style={{ height, width }}>
      <CSSTransition in={show} timeout={1000} classNames="animation" unmountOnExit>
        <AntdResult
          className={styles.card}
          status="error"
          title={titleEl}
          subTitle={subTitleEl}
          extra={hasAction && btnEl}
        />
      </CSSTransition>
    </section>
  );
};

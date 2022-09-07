import { Result as AntdResult, Button } from 'antd';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Loading } from '@/components/Loading';
import { useGetOrderDetail } from '@/features/order';

import { useResult, ResultType, StatusType } from '../../hooks/useResult';

interface ResultProps {
  type: ResultType;
  hash?: string;
  status: StatusType;
  orderToken?: string;
}

const defaultProps = {
  orderToken: undefined,
  hash: undefined,
};

const titleStyles = { color: 'white', fontSize: '1.2rem' };
const subTitleStyles = { color: '#bfbfbf', fontSize: '0.8rem' };

export const Result = ({ type, hash, status, orderToken }: ResultProps) => {
  const { actionHandler, btnText, showAction, titleText, successBuyAction } = useResult(type);

  const [show, setShow] = useState(false);

  const { data: orderDetailData, isLoading } = useGetOrderDetail({
    config: { enabled: !!orderToken },
    data: { Token: orderToken as string },
  });

  const titleEl = <span style={{ ...titleStyles }}>{titleText}</span>;

  const subTitleEl = (
    <span style={{ ...subTitleStyles }}>{`交易回執: ${
      hash || orderDetailData?.Tx_HASH || ''
    }`}</span>
  );

  const btnEl = (
    <Button onClick={actionHandler} type="primary">
      {btnText}
    </Button>
  );

  useEffect(() => {
    if (type === '購買完成') {
      successBuyAction();
    }
  }, [type, successBuyAction]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 50);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CSSTransition in={show} timeout={1000} classNames="animation" unmountOnExit>
      <AntdResult
        status={status}
        // title={}
        title={titleEl}
        subTitle={subTitleEl}
        extra={showAction && btnEl}
      />
    </CSSTransition>
  );
};

Result.defaultProps = defaultProps;

import { Result as AntdResult, Button } from 'antd';
import { useState, useEffect } from 'react';

import { useRedirect } from '@/hooks/useRedirect';

type ResultType = '轉帳完成' | '購買完成' | '取消' | '超時' | '申訴';
type StatusType = 'success' | 'error' | 'warning';

interface ResultProps {
  type: ResultType;
  hash: string;
  status: StatusType;
}

export const Result = ({ type, hash, status }: ResultProps) => {
  const [showAction, setShowAction] = useState(false);

  const { redirect } = useRedirect({ location: '/home' });

  const successBuyAction = () => {
    console.log('done');
    redirect();
  };

  const successTransferAction = () => {
    console.log('transfer');
  };

  const cancelAction = () => {
    console.log('cancel');
  };

  const overTimeAction = () => {
    console.log('overTime');
  };

  const appealAction = () => {
    console.log('appeal');
  };

  const getBtnText = () => {
    switch (type) {
      case '購買完成':
        return '返回訂單';
      default:
        return '確定';
    }
  };

  const actionHandler = (resultTyp: ResultType) => {
    switch (resultTyp) {
      case '購買完成':
        return successBuyAction();

      case '轉帳完成':
        return successTransferAction();

      case '取消':
        return cancelAction();

      case '超時':
        return overTimeAction();

      case '申訴':
        return appealAction();
      default:
        return () => {};
    }
  };

  useEffect(() => {
    if (type === '購買完成') {
      setShowAction(true);
    }
  }, [type]);

  const titleEl = <span style={{ color: 'white' }}>{type}</span>;
  const subTitleEl = <span style={{ color: 'white' }}>{`交易回執: ${hash}`}</span>;

  return (
    <AntdResult
      style={{ color: 'white' }}
      status={status}
      // title={}
      title={titleEl}
      subTitle={subTitleEl}
      extra={
        showAction && (
          <Button onClick={() => actionHandler(type)} type="primary">
            {getBtnText()}
          </Button>
        )
      }
    />
  );
};

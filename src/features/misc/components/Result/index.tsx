import { Result as AntdResult, Button } from 'antd';

import { useRedirect } from '@/hooks/useRedirect';

interface ResultProps {
  type: '完成' | '取消' | '超時' | '申訴';
  hash: string;
  status: 'success' | 'error' | 'warning';
}

export const Result = ({ type, hash, status }: ResultProps) => {
  const { redirect } = useRedirect({ location: '/home' });
  const successAction = () => {
    console.log('done');
    redirect();
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

  const actionHandler = () => {
    switch (type) {
      case '完成':
        return successAction();
      case '取消':
        return cancelAction();
      case '超時':
        return overTimeAction();
      case '申訴':
        return appealAction();
      default:
        return '確定';
    }
  };

  const getBtnText = () => {
    switch (type) {
      case '完成':
        return '返回訂單';
      default:
        return '確定';
    }
  };

  const titleEl = <span style={{ color: 'white' }}>{`交易${type}`}</span>;
  const subTitleEl = <span style={{ color: 'white' }}>{`交易回執: ${hash}`}</span>;
  return (
    <AntdResult
      style={{ color: 'white' }}
      status={status}
      // title={}
      title={titleEl}
      subTitle={subTitleEl}
      extra={
        <Button onClick={actionHandler} type="primary">
          {getBtnText()}
        </Button>
      }
    />
  );
};

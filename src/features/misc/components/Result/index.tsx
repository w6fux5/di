import { Result as AntdResult, Button } from 'antd';

import { useResult, ResultType, StatusType } from '../../hooks/useResult';

interface ResultProps {
  type: ResultType;
  hash: string;
  status: StatusType;
}

const titleStyles = { color: 'white', fontSize: '1.5rem' };
const subTitleStyles = { color: '#bfbfbf', fontSize: '0.8rem' };

export const Result = ({ type, hash, status }: ResultProps) => {
  const { actionHandler, btnText, showAction } = useResult(type);

  const titleEl = <span style={{ ...titleStyles }}>{type}</span>;

  const subTitleEl = <span style={{ ...subTitleStyles }}>{`交易回執: ${hash}`}</span>;

  const btnEl = (
    <Button onClick={actionHandler} type="primary">
      {btnText}
    </Button>
  );
  return (
    <AntdResult
      status={status}
      // title={}
      title={titleEl}
      subTitle={subTitleEl}
      extra={showAction && btnEl}
    />
  );
};

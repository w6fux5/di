import { Button, Result } from 'antd';

export const Error = () => {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
      }
    />
  );
};

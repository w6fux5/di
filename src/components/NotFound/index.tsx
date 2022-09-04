import { Result as AntdResult } from 'antd';

export const NotFound = () => {
  return <AntdResult title="404" subTitle="訂單編號或是URL不正確" />;
};

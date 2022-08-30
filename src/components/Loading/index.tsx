import { Spin } from 'antd';

export const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '15rem',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'red',
      }}
    >
      <Spin size="large" tip="loading..." delay={500} />
    </div>
  );
};

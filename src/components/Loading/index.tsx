import { Spin } from 'antd';

interface LoadingProps {
  tip?: string;
}

const defaultProps = {
  tip: 'loading...',
};

export const Loading = ({ tip }: LoadingProps) => {
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
        backgroundColor: 'rgba(255,255,255,0.05)',
      }}
    >
      <Spin size="large" tip={tip} delay={200} />
    </div>
  );
};

Loading.defaultProps = defaultProps;

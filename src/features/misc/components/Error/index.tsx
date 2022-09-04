import { Button, Result as AntdResult } from 'antd';

interface ErrorProps {
  title?: string;
  subTitle?: string;
  action?: () => void;
  actionType?: 'kyc';
}

const defaultProps = {
  title: 'There are some problems with your operation.',
  subTitle: '',
  action: false,
  actionType: '',
};

export const Error = ({ title, subTitle, action, actionType }: ErrorProps) => {
  // const refresh = () => {
  //   window.location.assign(window.location.origin);
  // };

  const getBtnText = () => {
    switch (actionType) {
      case 'kyc':
        return '前去實名驗證';
      default:
        return '確定';
    }
  };

  return (
    <AntdResult
      status="error"
      title={title}
      subTitle={subTitle}
      style={{
        backgroundColor: '#f2f2f2',
        borderRadius: '1rem',
        width: '35%',
        minWidth: '15rem',
      }}
      extra={
        action && (
          <Button type="primary" onClick={action}>
            {getBtnText()}
          </Button>
        )
      }
    />
  );
};

Error.defaultProps = defaultProps;

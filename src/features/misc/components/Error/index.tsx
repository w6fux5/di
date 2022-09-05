import { Button, Result as AntdResult } from 'antd';
import { useWindowSize } from 'react-use';

import { checkErrorActions } from '@/config/error-message';
import { useHttpErrorStore } from '@/stores/httpErrorStore';

import { ChatWidget } from '../../../chatWidget/ChatWidget';

const style = {
  backgroundColor: '#f2f2f2',
  borderRadius: '1rem',
  width: '35%',
  minWidth: '15rem',
  margin: 'auto',
};

export const Error = () => {
  const { width, height } = useWindowSize();
  const { dismissHttpError, httpErrors } = useHttpErrorStore.getState();
  const error = httpErrors[0];
  const { id, code, message } = error;

  const refresh = () => {
    dismissHttpError(id);
    window.location.reload();
  };

  const hasAction = checkErrorActions(code);

  return (
    <div style={{ height, width, paddingTop: '5rem' }}>
      <AntdResult
        status="error"
        title={message}
        subTitle={<span>Error Code: {code}</span>}
        style={style}
        extra={
          hasAction && (
            <Button type="primary" onClick={refresh}>
              重新嘗試
            </Button>
          )
        }
      />

      <div
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '5px',
        }}
      >
        <ChatWidget />
      </div>
    </div>
  );
};

// import { Button, Result as AntdResult } from 'antd';

// import { useHttpErrorStore } from '@/stores/httpErrorStore';

// interface ErrorProps {
//   title?: string;
//   subTitle?: string;
//   action?: () => void;
//   actionType?: 'kyc';
// }

// const defaultProps = {
//   title: 'There are some problems with your operation!',
//   subTitle: '',
//   action: false,
//   actionType: '',
// };

// export const Error = ({ title, subTitle, action, actionType }: ErrorProps) => {
//   console.log(useHttpErrorStore.getState().httpErrors);
//   // const refresh = () => {
//   //   window.location.assign(window.location.origin);
//   // };

//   const getBtnText = () => {
//     switch (actionType) {
//       case 'kyc':
//         return '前去實名驗證';
//       default:
//         return '確定';
//     }
//   };

//   return (
//     <AntdResult
//       status="error"
//       title={title}
//       subTitle={subTitle}
//       style={{
//         backgroundColor: '#f2f2f2',
//         borderRadius: '1rem',
//         width: '35%',
//         minWidth: '15rem',
//       }}
//       extra={
//         action && (
//           <Button type="primary" onClick={action}>
//             {getBtnText()}
//           </Button>
//         )
//       }
//     />
//   );
// };

// Error.defaultProps = defaultProps;

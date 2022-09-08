import { Button, Form, Input } from 'antd';

import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { LoginCredentialsDTO } from '../api/Login';
import { useAuth } from '../hooks/useAuth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  const { md } = useMediaQuery();

  const onFinish = async (values: LoginCredentialsDTO) => {
    await login(values);
    onSuccess();
  };

  return (
    <section>
      <Form name="horizontal_login" layout={md ? 'vertical' : 'inline'} onFinish={onFinish}>
        <Form.Item
          getValueFromEvent={(e: any) => {
            const { value } = e.target;
            return value.replace(/[^\d{1,}.\d{1,}|\d{1,}]/g, '');
          }}
          name="Login_tel"
          rules={[{ required: true, message: '請輸入手機號碼!' }]}
        >
          <Input placeholder="請輸入手機號碼" />
        </Form.Item>

        <Form.Item name="Login_pwd" rules={[{ required: true, message: '請輸入密碼!' }]}>
          <Input.Password placeholder="請輸入密碼" />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoggingIn} htmlType="submit" type="primary" style={{ width: '100%' }}>
            登入
          </Button>
        </Form.Item>
      </Form>

      <a
        style={{ fontSize: '1rem' }}
        href="https://www.88u.asia/#/auth/register"
        target="_blank"
        rel="noreferrer"
      >
        還沒有帳號？現在去註冊
      </a>
    </section>
  );
};

// {!user?.login_session ? (
//   <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
//     <Form.Item name="Login_tel" rules={[{ required: true, message: '請輸入手機號碼!' }]}>
//       <Input placeholder="請輸入手機號碼" />
//     </Form.Item>

//     <Form.Item name="Login_pwd" rules={[{ required: true, message: '請輸入密碼!' }]}>
//       <Input.Password placeholder="請輸入密碼" />
//     </Form.Item>

//     <Form.Item>
//       <Button
//         loading={isLoggingIn}
//         htmlType="submit"
//         type="primary"
//         style={{ width: '100%' }}
//       >
//         登入
//       </Button>
//     </Form.Item>
//   </Form>
// ) : (
//   <div className={styles.paymentBlock}>
//     <div className={styles.paymentTitle}>{934024392} 歡迎登入</div>
//     <div className={styles.paymentBody}>
//       <div>
//         可提餘額(USDT)：
//         {/* <div>{order?.avbSurplus || 0}</div> */}
//       </div>
//       <div>
//         支付數量(USDT)：
//         {/* <div>-{order?.agtSurplus || 0}</div> */}
//       </div>
//     </div>
//     <div className={styles.paymentFooter}>
//       <div>
//         結餘(USDT)：
//         {/* <div>{order?.realSurplus || 0}</div> */}
//       </div>
//       <div>
//         {true ? <span className={styles.payInsufficient}>餘額不足</span> : <span />}
//         <div>
//           餘額不足?<span>前往購買USDT</span>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

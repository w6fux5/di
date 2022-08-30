import { Button, Form, Input } from 'antd';
import { createBreakpoint } from 'react-use';

import { LoginCredentialsDTO } from '../api/Login';
import { useAuth } from '../hooks/useAuth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const useBreakpoint = createBreakpoint({ XL: 1280, L: 950, S: 350 });
  const { login, isLoggingIn } = useAuth();

  const onFinish = async (values: LoginCredentialsDTO) => {
    await login(values);
    onSuccess();
  };
  return (
    <>
      <Form
        name="horizontal_login"
        layout={useBreakpoint() === 'L' ? 'inline' : 'vertical'}
        onFinish={onFinish}
      >
        <Form.Item name="Login_tel" rules={[{ required: true, message: '請輸入手機號碼!' }]}>
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
      <Button style={{ padding: 0 }} type="link" href="https://www.88u.asia/#/auth/register">
        還沒有帳號？現在去註冊
      </Button>
    </>
  );
};

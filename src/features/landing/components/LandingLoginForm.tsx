/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
// eslint-disable-next-line import/order
import { Button, Form, Input } from 'antd';

// import { createBreakpoint } from 'react-use';
import { useEffect, useState } from 'react';

import { LoginCredentialsDTO, useAuth } from '@/features/auth';

import { FetchOrder } from '../api/FetchOrder';

import styles from './Landing.module.less';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LandingLoginForm = ({ onSuccess }: LoginFormProps) => {
  //   const useBreakpoint = createBreakpoint({ XL: 1280, L: 950, S: 350 });
  const { login, isLoggingIn, user } = useAuth();
  const [order, setOrder] = useState({
    avbSurplus: 0,
    agtSurplus: 0,
    realSurplus: 0,
  });

  const onFinish = async (values: LoginCredentialsDTO) => {
    await login(values);
    onSuccess();
  };
  useEffect(() => {
    if (user?.login_session) {
      new Promise((reslove) => {
        const res = FetchOrder(user?.login_session)();
        reslove(res);
      }).then((res: any) => {
        console.log('res => ', res);
        setOrder({
          avbSurplus: res.data.Avb_Balance,
          agtSurplus: res.data.AgtBalance,
          realSurplus: res.data.Real_Balance,
        });
      });
    }
  }, [user]);
  useEffect(() => {
    console.log(order);
  });
  return (
    <>
      {!user?.login_session ? (
        <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item name="Login_tel" rules={[{ required: true, message: '請輸入手機號碼!' }]}>
            <Input placeholder="請輸入手機號碼" />
          </Form.Item>

          <Form.Item name="Login_pwd" rules={[{ required: true, message: '請輸入密碼!' }]}>
            <Input.Password placeholder="請輸入密碼" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoggingIn}
              htmlType="submit"
              type="primary"
              style={{ width: '100%' }}
            >
              登入
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className={styles.paymentBlock}>
          <div className={styles.paymentTitle}>{934024392} 歡迎登入</div>
          <div className={styles.paymentBody}>
            <div>
              可提餘額(USDT)：
              <div>{order?.avbSurplus || 0}</div>
            </div>
            <div>
              支付數量(USDT)：
              <div>-{order?.agtSurplus || 0}</div>
            </div>
          </div>
          <div className={styles.paymentFooter}>
            <div>
              結餘(USDT)：
              <div>{order?.realSurplus || 0}</div>
            </div>
            <div>
              {order?.avbSurplus - order?.agtSurplus < 0 ? (
                <span className={styles.payInsufficient}>餘額不足</span>
              ) : (
                <span />
              )}
              <div>
                餘額不足?<span>前往購買USDT</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Button style={{ padding: 0 }} type="link" href="https://www.88u.asia/#/auth/register">
        還沒有帳號？現在去註冊
      </Button>
    </>
  );
};

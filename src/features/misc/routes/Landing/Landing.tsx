import { useEffect } from 'react';

import logo from '@/assets/88u_logo.png';
import { LandingLayout } from '@/components/Layout';
import { useAuth, LandingLoginForm } from '@/features/auth';
import { TransactionInfo } from '@/features/user';
import storage from '@/utils/storage';

import styles from './Landing.module.less';

type LandingProps = {
  sessionID: string | undefined;
};

export const Landing = ({ sessionID }: LandingProps) => {
  const { user } = useAuth();

  const onSuccess = () => {
    console.log('login success');
  };

  useEffect(() => {
    if (!sessionID) return;
    storage.setSession(sessionID);
  }, [sessionID]);

  return (
    <LandingLayout>
      <section className={styles.container}>
        <div className={`${styles.card}`}>
          <img className={styles.logo} src={logo} alt="88u logo" />
          <div style={{ fontSize: '1.5rem' }}>使用 88U ASIA 支付</div>
          <div style={{ margin: '5px 0 2rem 0' }}>簡易 | 快速 | 24H即時交易到帳</div>
          {user ? <TransactionInfo /> : <LandingLoginForm onSuccess={onSuccess} />}
        </div>
      </section>
    </LandingLayout>
  );
};

/**
 * 
 * const bodyText = [
  ['支付數量(USDT):', '-1000'],
  ['協議種類:', 'Trc'],
  ['手續費:', 30],
  ['結餘(USDT):', 1000],
  ['轉帳地址', 'efwefewfwef'],
];
const reminder = ' 交易款項將從您的錢包轉出，請再次確認，確保交易安全。';

  const [showRemind, setShowRemind] = useState(false);

 * 
 *  /* <RemindWindow
        title={reminder}
        bodyText={bodyText}
        setVisible={setShowRemind}
        visible={showRemind}
        cancel
      /> */

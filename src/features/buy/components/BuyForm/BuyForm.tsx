import { SwapOutlined } from '@ant-design/icons';
import { Row, Col, InputNumber, Input, Button, Space, Select, Statistic } from 'antd';
import { isNumber } from 'lodash';
import { useState, useEffect } from 'react';

import { useExRate } from '@/features/exRate';
import { useBankData, BankDataType, BankDataProps } from '@/features/user';
import { getIntTotalAmount } from '@/utils/numberFormat';

import { useBuyMatch1, RequestData } from '../../api/buyMatch1';

const { Option } = Select;

interface BuyFormProps {
  onSuccess: (orderToken: string) => void;
}

export const BuyForm = ({ onSuccess }: BuyFormProps) => {
  // Init State
  const [usdtAmount, setUsdtAmount] = useState<number>();
  const [twdAmount, setTwdAmount] = useState<number>();
  const [accountList, setAccountList] = useState<BankDataType>();
  const [latestAccount, setLatestAccount] = useState<BankDataProps>(); // 最新的銀行帳號
  const [showBankForm, setShowBankForm] = useState(false);
  const [selectBankData, setSelectBankData] = useState<string>('');

  const [buyMatchData, setBuyMatchData] = useState<RequestData>({
    ClientName: '', // P1 Name | P2 account | P3 bankCode
    UsdtAmt: undefined,
  });

  // Query State
  const { data: bankData } = useBankData();
  const { data: exRateData } = useExRate();
  const {
    refetch,
    data: buyOrderToken,
    isLoading,
  } = useBuyMatch1({
    config: { enabled: false },
    data: buyMatchData,
  });

  const onChange = (value: number) => {
    if (!value || !isNumber(value)) {
      setTwdAmount(undefined);
      return;
    }
    setUsdtAmount(value);

    const { RMB_BUY: rate } = exRateData || {};
    if (!rate) return;
    const amount = getIntTotalAmount({ rate, amount: value });
    setTwdAmount(amount);
  };

  const showBankFormToggle = () => {
    setShowBankForm((prev) => !prev);
  };

  const handleChange = ({ value }: { value: string; label: React.ReactNode }) => {
    setSelectBankData(value);
  };

  const handleSubmit = () => {
    const accountToken = selectBankData || latestAccount?.token;
    const selectAccount = bankData?.find((el) => el.token === accountToken);
    if (!selectAccount) return;
    const ClientName = `${selectAccount.P2}|${selectAccount.P1}|${selectAccount.P3}`; // "name|account|code"
    const matchData: RequestData = {
      UsdtAmt: usdtAmount,
      ClientName,
    };

    setBuyMatchData(matchData);
  };

  useEffect(() => {
    if (!buyMatchData.ClientName || !buyMatchData.UsdtAmt) return;
    refetch();
  }, [buyMatchData, refetch]);

  useEffect(() => {
    const validAccount = bankData?.filter((el) => el.User_BankStatus === 101);
    const latestItem = validAccount?.slice(-1)[0] || undefined;
    setLatestAccount(latestItem);
    setAccountList(validAccount);
  }, [bankData]);

  useEffect(() => {
    if (!buyOrderToken) return;
    onSuccess(buyOrderToken.order_token);
  }, [buyOrderToken, onSuccess]);

  return (
    <section style={{ padding: '5rem', width: '100%' }}>
      <Space style={{ width: '100%' }} direction="vertical">
        <Input.Group size="large">
          <Row gutter={8}>
            <Col span={10}>
              <InputNumber
                style={{ width: '100%' }}
                addonAfter={<span>USDT</span>}
                value={usdtAmount}
                onChange={onChange}
                min={1}
                max={10000}
                onPressEnter={showBankFormToggle}
                disabled={showBankForm}
              />
            </Col>
            <Col
              style={{
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              span={4}
            >
              <SwapOutlined style={{ color: 'white' }} />
            </Col>
            <Col span={10}>
              <InputNumber
                style={{ width: '100%' }}
                addonAfter={<span>TWD</span>}
                value={twdAmount}
                readOnly
                disabled={showBankForm}
              />
            </Col>
          </Row>
        </Input.Group>

        <Button type="primary" disabled={!usdtAmount || !twdAmount} onClick={showBankFormToggle}>
          銀行資訊
        </Button>

        {showBankForm && (
          <Row gutter={8} style={{ height: '3rem' }}>
            <Col span={12}>
              <Select
                defaultValue={{
                  value: latestAccount?.token as string,
                  label: `${latestAccount?.P2}  ${latestAccount?.P1}`,
                }}
                style={{ width: '100%' }}
                onChange={handleChange}
              >
                {accountList?.map((b) => (
                  <Option key={b.token} value={b.token}>{`${b.P2}  ${b.P1}`}</Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <div
                style={{
                  height: '100%',
                  border: '1px solid blue',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Statistic
                  title={<span style={{ color: 'white' }}>數量</span>}
                  valueStyle={{ color: 'white' }}
                  value={twdAmount}
                  suffix={<span>USDT</span>}
                />
                <Statistic
                  title={<span style={{ color: 'white' }}>總價</span>}
                  valueStyle={{ color: 'white' }}
                  value={usdtAmount}
                  suffix={<span>TWD</span>}
                />
              </div>
            </Col>
            <Col span={12} style={{ margin: 'auto', height: '3rem', marginTop: '3rem' }}>
              <Button
                style={{ width: '100%', height: '100%' }}
                type="primary"
                onClick={handleSubmit}
                loading={isLoading}
              >
                開始配對
              </Button>
            </Col>
          </Row>
        )}
      </Space>
    </section>
  );
};

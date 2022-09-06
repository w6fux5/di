import { SwapOutlined } from '@ant-design/icons';
import { InputNumber, Input, Button, Space, Select, Divider } from 'antd';
import { useState, useEffect } from 'react';

import { useExRate, ExRateDivider, dividerStyles } from '@/features/exRate';
import { AmountCard } from '@/features/misc';
import { useBankData, BankDataType, BankDataProps } from '@/features/user';
import { getIntTotalAmount, thousandthsFormatWithSymbolAndToFixed } from '@/utils/numberFormat';

import { useBuyMatch1, RequestData } from '../../api/buyMatch1';

const { Option } = Select;

interface BuyFormProps {
  onSuccess: (orderToken: string) => void;
  finalBalance: number;
}

export const BuyForm = ({ onSuccess, finalBalance }: BuyFormProps) => {
  const { data: bankData } = useBankData();

  const { data: exRateData } = useExRate();
  const { RMB_BUY: rate } = exRateData || {};

  const [usdtAmount] = useState<number>(Math.abs(finalBalance));

  const amount = getIntTotalAmount({ rate, amount: usdtAmount });

  const [twdAmount] = useState<number>(amount);

  const [accountList, setAccountList] = useState<BankDataType>();

  const [latestAccount, setLatestAccount] = useState<BankDataProps>(); // 最新的銀行帳號

  const [selectBankData, setSelectBankData] = useState<string>('');

  const [buyMatchData, setBuyMatchData] = useState<RequestData>({
    ClientName: '', // P1 Name | P2 account | P3 bankCode
    UsdtAmt: undefined,
  });

  const {
    refetch,
    data: buyOrderToken,
    isLoading,
  } = useBuyMatch1({
    config: { enabled: false },
    data: buyMatchData,
  });

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
    <section style={{ maxWidth: '550px', width: '90%' }}>
      <ExRateDivider />
      <Space style={{ width: '100%' }} direction="vertical">
        <Input.Group
          size="large"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <InputNumber
            style={{ width: '100%' }}
            addonAfter={<span>USDT</span>}
            value={usdtAmount}
            min={1}
            max={10000}
            precision={2}
            disabled
            formatter={(value) => thousandthsFormatWithSymbolAndToFixed({ value, type: 'usdt' })}
          />

          <SwapOutlined style={{ color: 'white', fontSize: '2rem', transform: 'rotate(90deg)' }} />

          <InputNumber
            style={{ width: '100%' }}
            addonAfter={<span>TWD</span>}
            value={twdAmount}
            readOnly
            disabled
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Input.Group>

        {latestAccount && (
          <>
            <Divider style={{ ...dividerStyles }} orientation="left">
              選擇銀行帳號
            </Divider>

            <Space size="large" direction="vertical" style={{ width: '100%' }}>
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

              <Divider style={{ ...dividerStyles }} orientation="left">
                總計
              </Divider>

              {twdAmount && usdtAmount && (
                <AmountCard twdAmount={twdAmount} usdtAmount={usdtAmount} />
              )}

              <Button
                style={{ width: '100%', height: '100%' }}
                type="primary"
                onClick={handleSubmit}
                loading={isLoading}
              >
                開始配對
              </Button>
            </Space>
          </>
        )}
      </Space>
    </section>
  );
};

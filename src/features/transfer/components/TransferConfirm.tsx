import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal as AntdModal, Space } from 'antd';

import { PaymentInfoTypes, CheckBalanceTypes } from '@/features/user';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isShow: boolean) => void;
  balance?: CheckBalanceTypes;
  paymentInfo?: PaymentInfoTypes;
  handleTransfer: () => void;
  transferLoading: boolean;
};

const defaultProps = {
  balance: null,
  paymentInfo: null,
};

const title = (
  <Space style={{ color: '#E38800' }}>
    <ExclamationCircleOutlined />
    <span>交易款項將從你的錢包轉出，請再次確認，確保交易安全</span>
  </Space>
);

export const TransferConfirm = ({
  isOpen,
  setIsOpen,
  balance,
  paymentInfo,
  handleTransfer,
  transferLoading,
}: ModalProps) => {
  const agt = balance?.AgtBalance || 0;
  const usdtAmt = paymentInfo?.USDTAmt || 0;
  const finalBalance = agt - usdtAmt;

  const handleOk = () => {
    handleTransfer();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <AntdModal
      closable={false}
      destroyOnClose
      title={title}
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={transferLoading}
    >
      <div>可提餘額(USDT)： {balance?.AgtBalance}</div>
      <div>支付數量(USDT)： {paymentInfo?.USDTAmt}</div>
      <div>結餘(USDT)： {finalBalance}</div>
      <div>訂單成立時間： {paymentInfo?.RequestDate}</div>
      <div>TRC20轉帳地址：</div>
      <div>{paymentInfo?.WalletAddress}</div>
    </AntdModal>
  );
};

TransferConfirm.defaultProps = defaultProps;

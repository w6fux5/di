import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal as AntdModal, Space } from 'antd';

import { TransactionDescription, PaymentInfoTypes, CheckBalanceTypes } from '@/features/user';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isShow: boolean) => void;
  balance?: CheckBalanceTypes;
  paymentInfo: PaymentInfoTypes;
  handleTransfer: () => void;
  transferLoading: boolean;
};

const defaultProps = {
  balance: null,
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
      centered
      // style={{ backgroundColor: 'red' }}
    >
      <TransactionDescription
        finalBalance={finalBalance}
        balance={balance}
        paymentInfo={paymentInfo}
        light
      />
    </AntdModal>
  );
};

TransferConfirm.defaultProps = defaultProps;

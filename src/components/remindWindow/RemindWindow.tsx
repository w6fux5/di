/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './RemindWindow.module.less';

const rightText = {
  payAmount: '支付數量(USDT):',
  protoTypes: '協議種類:',
  fee: '手續費:',
  surplus: '結餘(USDT):',
  address: '轉帳地址',
};
type remindProps = {
  visible: boolean;
  setVisible: Function;
};

const RemindWindow = ({ visible, setVisible }: remindProps) => {
  //   const navigate = useNavigate();
  console.log();

  return (
    <div style={{ display: visible ? 'flex' : 'none' }} className={styles.remindWindowMask}>
      <div className={styles.remindWindowBlock}>
        <div className={styles.remindWindowTitle}>
          交易款項將從您的錢包轉出，請再次確認，確保交易安全。
        </div>
        <div className={styles.remindWindowBody}>
          {Object.keys(rightText).map((item) => (
            <div className={styles.remindWindowRow}>
              <div>{rightText[item as keyof typeof rightText]}</div>
              <div>-1000.00</div>
            </div>
          ))}
        </div>
        <div className={styles.remindWindowFooter}>
          <div onClick={() => setVisible(false)} className={styles.remindWindowBtnCancel}>
            取消
          </div>
          <div
            onClick={() => {
              setVisible(false);
            }}
            className={styles.remindWindowBtnConfirm}
          >
            確認
          </div>
        </div>
      </div>
    </div>
  );
};
export default RemindWindow;

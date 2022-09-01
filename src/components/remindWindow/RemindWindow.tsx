/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
// import { useNavigate } from 'react-router-dom';

import styles from './RemindWindow.module.less';

type remindProps = {
  visible: boolean;
  setVisible: Function;
  cancel?: boolean;
  bodyText: Array<Array<string | number>>;
  title: string;
};

const RemindWindow = ({ visible, setVisible, bodyText, cancel = false, title }: remindProps) => {
  //   const navigate = useNavigate();
  console.log();

  return visible ? (
    <div className={styles.remindWindowMask}>
      <div className={styles.remindWindowBlock}>
        <div className={styles.remindWindowTitle}>{title}</div>
        <div className={styles.remindWindowBody}>
          {bodyText.map((item) => (
            <div className={styles.remindWindowRow}>
              <div>{item[0]}</div>
              <div>{item[1]}</div>
            </div>
          ))}
        </div>
        <div className={styles.remindWindowFooter}>
          {cancel && (
            <div onClick={() => setVisible(false)} className={styles.remindWindowBtnCancel}>
              取消
            </div>
          )}
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
  ) : (
    <></>
  );
};
export default RemindWindow;

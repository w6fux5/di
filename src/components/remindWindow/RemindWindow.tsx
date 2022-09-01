import styles from './RemindWindow.module.less';

type RemindProps = {
  visible: boolean;
  setVisible: Function;
  cancel?: boolean;
  bodyText: Array<Array<string | number>>;
  title: string;
};

const defaultProps = {
  cancel: false,
};

export const RemindWindow = ({
  visible,
  setVisible,
  bodyText,
  cancel = false,
  title,
}: RemindProps) => {
  return (
    <div style={{ display: visible ? 'block' : 'none' }} className={styles.remindWindowMask}>
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
            <button
              type="button"
              onClick={() => setVisible(false)}
              className={styles.remindWindowBtnCancel}
            >
              取消
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setVisible(false);
            }}
            className={styles.remindWindowBtnConfirm}
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

RemindWindow.defaultProps = defaultProps;

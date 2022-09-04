import styles from './RemindWindow.module.less';

type BodyItems = {
  id: string;
  title: string;
  content: string | number | undefined;
};

type RemindProps = {
  visible: boolean;
  setVisible: Function;
  cancel?: boolean;
  bodyText: BodyItems[];
  title: string;
  confirmClick: () => void;
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
  confirmClick,
}: RemindProps) => {
  return (
    <div style={{ display: visible ? 'block' : 'none' }} className={styles.remindWindowMask}>
      <div className={styles.remindWindowBlock}>
        <div className={styles.remindWindowTitle}>{title}</div>
        <div className={styles.remindWindowBody}>
          {bodyText.map(({ id, title: bodyTitle, content }) => (
            <div style={{ color: 'black' }} key={id} className={styles.remindWindowRow}>
              <div>{bodyTitle}</div>
              <div>{content}</div>
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
          <button type="button" onClick={confirmClick} className={styles.remindWindowBtnConfirm}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

RemindWindow.defaultProps = defaultProps;

/**
 * 
 * const bodyText = [
  ['支付數量(USDT):', '-1000'],
  ['協議種類:', 'Trc'],
  ['手續費:', 30],
  ['結餘(USDT):', 1000],
  ['轉帳地址', 'efwefewfwef'],
];
const reminder = ;

  const [showRemind, setShowRemind] = useState(false);

 * 
 *  /* <RemindWindow
        title={reminder}
        bodyText={bodyText}
        setVisible={setShowRemind}
        visible={showRemind}
        cancel
      /> */

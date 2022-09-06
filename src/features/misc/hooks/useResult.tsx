import { useRedirect } from '@/hooks/useRedirect';

export type ResultType = '轉帳完成' | '購買完成' | '取消' | '超時' | '申訴中';

export type StatusType = 'success' | 'error' | 'warning';

export const useResult = (type: ResultType) => {
  const { redirect } = useRedirect({ location: '/home' });
  const successBuyAction = () => {
    redirect();
  };
  const successTransferAction = () => {};
  const cancelAction = () => {};
  const overTimeAction = () => {};
  const appealAction = () => {};

  // 判斷 action 執行的 function
  const actionHandler = () => {
    switch (type) {
      case '購買完成':
        return successBuyAction();

      case '轉帳完成':
        return successTransferAction();

      case '取消':
        return cancelAction();

      case '超時':
        return overTimeAction();

      case '申訴中':
        return appealAction();

      default:
        return () => {};
    }
  };

  // 判斷是否需要 actions
  const checkAction = (): boolean => {
    switch (type) {
      case '購買完成':
        return true;
      default:
        return false;
    }
  };

  // 判斷 button 顯示的文字
  const btnTextHandler = (): string => {
    switch (type) {
      case '購買完成':
        return '返回訂單';
      default:
        return '確定';
    }
  };

  const btnText = btnTextHandler();
  const showAction = checkAction();

  return {
    actionHandler,
    btnText,
    showAction,
  };
};

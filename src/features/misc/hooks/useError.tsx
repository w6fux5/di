import { useHttpErrorStore } from '@/stores/httpErrorStore';

export const useError = () => {
  const { dismissHttpError, httpErrors } = useHttpErrorStore.getState();

  const error = httpErrors[0];

  const { id, code, message } = error;

  const btnTextHandler = (): string => {
    switch (code) {
      case '91':
        return '重新登入';

      case '32':
        return '買幣';

      default:
        return '重新嘗試';
    }
  };

  const refresh = () => {
    dismissHttpError(id);
    window.location.reload();
  };

  const reLogin = () => {
    localStorage.clear();
    refresh();
  };

  const actionHandler = (): void => {
    switch (code) {
      case '91':
        return reLogin();

      case '32':
        return reLogin();

      default:
        return refresh();
    }
  };

  const checkErrorActions = (): boolean => {
    switch (code) {
      case '15':
        return false;

      case '1':
        return false;

      case '90':
        return false;

      default:
        return true;
    }
  };

  const hasAction = checkErrorActions();
  const btnText = btnTextHandler();

  return {
    btnText,
    hasAction,
    actionHandler,
    message,
    code,
  };
};

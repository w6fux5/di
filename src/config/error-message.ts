interface ErrorMessage {
  [key: string]: string;
}

export const errorMessage: ErrorMessage = {
  '15': '訂單已經失效', // 跳轉的 url session 錯誤
  '90': '沒有訂單編號', // 發送請求時 header 沒有 dp_order
  '1': '訂單編號錯誤', // dp_order session 錯誤
};

export const checkErrorActions = (code: string): boolean => {
  switch (code) {
    case '15':
      return false;

    default:
      return true;
  }
};

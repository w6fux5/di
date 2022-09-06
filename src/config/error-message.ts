interface ErrorMessage {
  [key: string]: string;
}

export const errorMessage: ErrorMessage = {
  '15': '訂單已經失效', // 跳轉的 url session 錯誤
  '90': '沒有訂單編號', // 發送請求時 header 沒有 dp_order
  '91': 'token過期，請重新登入',
  '1': '訂單編號錯誤', // dp_order session 錯誤
  '10': '帳號或密碼錯誤',
};

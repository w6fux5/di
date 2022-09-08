interface ErrorMessage {
  [key: string]: string;
}

export const errorMessage: ErrorMessage = {
  '15': '請重新提交訂單，謝謝', // 跳轉的 url session 錯誤
  '90': '請重新提交訂單，謝謝', // 發送請求時 header 沒有 dp_order
  '1': '請重新提交訂單，謝謝', // dp_order session 錯誤

  '10': '帳號或密碼錯誤，請重新確認',
  '91': '登入失敗，請重新登入',

  '41': '已達交易限額，若需提升交易額度請聯繫客服，謝謝',

  '32': '金額不足',

  ERR_BAD_REQUEST: '伺服器忙碌中，請稍後重新提交訂單，謝謝',
};

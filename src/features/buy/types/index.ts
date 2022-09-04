export type OrderDataTypes = {
  CreateDate: string;
  D1: number; // 匯率
  D2: number; // 法幣總價
  D3: number; // 手續費
  Date: string; // ＊待確認
  DeltaTime: number; // 用來計算剩餘時間
  MasterType: number; // (0 => 買 ), (1 => 賣 ), (2 => 轉出,), (3 => 轉入)
  Order_TypeID: number; // *待確認 (2 => 買), (3 => 賣)
  Order_StatusID: number; // 參考註釋一
  P1: string | null; // 銀行帳號 (收款方)
  P2: string | null; // 戶名 (收款方)
  P3: string | null; // 銀行代碼 or 銀行名稱 (收款方)
  P4: string | null; // city (收款方)
  P5: string; // 付款方資料
  Tx_HASH: string;
  UsdtAmt: 1; // USDT數量
};

export type OrderWebSocketResponse = {
  code: number;
  msg: string;
  data: OrderDataTypes;
};

/**   註釋一 (Order_StatusID)
 * 1 => 交易成功 => <Result />
 * 98 => 交易超時 => <Result />
 * 99 => 交易取消 => <Result />
 *
 * 31 =>  配對中 => <Matching />
 *
 * 33 => 等待付款 => <Payment />
 *
 * 34 => 等待收款 => <Wait />
 * 35 => 申訴狀態 <Wait />
 *
 */

import { nanoid } from 'nanoid';
import { useState } from 'react';

import { useWebsocket } from '@/hooks';
import { getParamsFromUrl, urlParamsKey } from '@/utils/urlParse';

const ROOT_URL = '';

// /ws_ChatOrder3.ashx
// ?login_session=1234&order_token=abcd

type MessageType = {
  Message: string;
  Message_Role: number;
  Message_Type: number;
  Sysdate: string;
  Tx_HASH: string;
  token: string;
  id: string;
};

export const useChatWidgetSocket = () => {
  const sessionID = getParamsFromUrl(urlParamsKey.session_id);
  const buyOrderToken = getParamsFromUrl(urlParamsKey.buy_token);
  const url = `${ROOT_URL}?session_id=${sessionID}&order_token=${buyOrderToken}`;

  const [messageList, setMessageList] = useState<MessageType[]>([]);

  const options = {
    onMessage: (message: WebSocketEventMap['message']) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.token !== buyOrderToken) return;
      setMessageList((prev) => [...prev, { ...dataFromServer, id: nanoid() }]);
    },
  };

  const { sendText, sendImg } = useWebsocket({ url, options });

  return {
    messageList,
    sendImg,
    sendText,
    buyOrderToken,
  };
};

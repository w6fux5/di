import { isArray } from 'lodash';
import { nanoid } from 'nanoid';
import { useState } from 'react';

import { AuthUser } from '@/features/auth';
import { useWebsocket } from '@/hooks';
import { getParamsFromUrl, urlParamsKey } from '@/utils/urlParse';

const BASE_URL = 'wss://chat.88u.asia';
const URL = `WS_ChatOrder.ashx`;

type MessageType = {
  Message: string;
  Message_Role: number;
  Message_Type: number;
  Sysdate: string;
  Tx_HASH: string;
  token: string;
  id: string;
};

type UseChatWidgetSocketProps = {
  user: AuthUser;
};

export const useChatWidgetSocket = ({ user }: UseChatWidgetSocketProps) => {
  const buyOrderToken = getParamsFromUrl(urlParamsKey.buy_token);
  const url = `${URL}?login_session=${user}&order_token=${buyOrderToken}`;

  const [messageList, setMessageList] = useState<MessageType[]>([]);

  const options = {
    onMessage: (message: WebSocketEventMap['message']) => {
      if (!message?.data) return;
      const dataFromServer = JSON.parse(message?.data);

      if (isArray(dataFromServer)) {
        const reversMessageList = dataFromServer.reverse();
        setMessageList(reversMessageList);
      } else {
        setMessageList((prev) => [...prev, { ...dataFromServer, id: nanoid() }]);
      }
    },
  };

  const { sendMessage } = useWebsocket({ url, options, BASE_URL });

  const sendText = (value: string) => {
    const message = JSON.stringify({
      Message_Type: 1,
      Message: value.toString(),
    });

    sendMessage(message);
  };

  const sendImg = async (image: string) => {
    const imageMessage = JSON.stringify({
      Message_Type: 2,
      Message: image,
    });
    sendMessage(imageMessage);
  };

  return {
    messageList,
    sendImg,
    sendText,
    buyOrderToken,
  };
};

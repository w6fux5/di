import useWebSocket, { ReadyState } from 'react-use-websocket';

const BASE_URL = 'wss://www.88u.asia/j';

type Websocket = {
  url: string;
  options?: any;
};

export const useWebsocket = ({ url, options }: Websocket) => {
  const { readyState, sendMessage, lastJsonMessage } = useWebSocket(`${BASE_URL}/${url}`, {
    ...options,
    onError: (error) => {
      console.log(error, 'error');
    },
    onClose: (e) => {
      console.log(e, 'close');
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const sendText = (value: string, orderToken: string) => {
    if (value === '' || !orderToken) {
      alert('沒有token');
      return;
    }

    sendMessage(
      JSON.stringify({
        Message_Type: 1,
        Message: value.toString(),
        token: orderToken,
      }),
    );
  };
  const sendImg = async (image: string, token: string) => {
    if (!image || !token) {
      return;
    }

    try {
      sendMessage(
        JSON.stringify({
          Message_Type: 2,
          Message: image,
          token,
        }),
      );
    } catch (error) {
      alert(error);
    }
  };

  return { connectionStatus, sendText, sendImg, lastJsonMessage };
};

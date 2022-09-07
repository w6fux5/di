import useWebSocket, { ReadyState } from 'react-use-websocket';

const DEFAULT_URL = 'wss://www.88u.asia/j';

type Websocket = {
  url: string;
  options?: any;
  BASE_URL?: string;
};

export const useWebsocket = ({ url, options, BASE_URL = DEFAULT_URL }: Websocket) => {
  console.log(url);
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

  return { connectionStatus, sendMessage, lastJsonMessage };
};

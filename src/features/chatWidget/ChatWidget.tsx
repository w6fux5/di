import { CloseCircleOutlined } from '@ant-design/icons';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { Button } from 'antd';
import { ChangeEvent, useRef, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { resizeFile } from '@/utils/image-resize';

import styles from './ChatWidget.module.less';
import { useChatWidgetSocket } from './hooks/useChatWidgetSocket';

const arr = new Array(20).fill(null);

export const ChatWidget = () => {
  const [showWidget, setShowWidget] = useState<boolean>(false);
  // const [pending, startTransition] = useTransition();

  const { messageList, sendImg, sendText, buyOrderToken } = useChatWidgetSocket();
  console.log(messageList);

  const inputRef = useRef<HTMLInputElement>(null);

  const attachClickHandler = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  // send image
  const imgChangeHandler = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return;
    const originImage = target?.files[0];
    const image = (await resizeFile(originImage)) as string;
    sendImg(image, buyOrderToken);
  };

  // send text
  const onSend = (message: string) => {
    sendText(message, buyOrderToken);
  };
  return (
    <section className={styles.container}>
      {showWidget && (
        <>
          <ConversationHeader style={{ borderRadius: '5px 5px 0 0' }}>
            <ConversationHeader.Content userName={<span style={{}}>CHAT</span>} />
            <ConversationHeader.Actions>
              <CloseCircleOutlined
                onClick={() => setShowWidget(false)}
                style={{ fontSize: '1.5rem', cursor: 'pointer' }}
              />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MainContainer style={{ borderRadius: '0 0 5px 5px' }}>
            <ChatContainer>
              <MessageList>
                {arr.map(() => (
                  <Message
                    model={{
                      direction: Math.random() > 0.5 ? 'outgoing' : 'incoming',
                      position: 'last',
                    }}
                  >
                    <Avatar src="https://picsum.photos/200/300" />
                    <Message.TextContent>
                      <span style={{}}>test</span>
                      {/* <span style={{ color: '#EF7C8E' }}>test</span> */}
                      {/* <span style={{ color: '#FAE8E0' }}>test</span> */}
                    </Message.TextContent>
                    <Message.Footer style={{ color: '#d9d9d9' }}>08:30</Message.Footer>
                  </Message>
                ))}
              </MessageList>

              <MessageInput
                onSend={onSend}
                onAttachClick={attachClickHandler}
                placeholder="Type message here"
              />
            </ChatContainer>
          </MainContainer>
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            onChange={imgChangeHandler}
          />
        </>
      )}

      <Button
        onClick={() => {
          setShowWidget(true);

          // startTransition(() => {
          //   setShowWidget(true);
          // });
        }}
        className={styles.button}
        shape="round"
        type="primary"
      >
        Message
      </Button>
    </section>
  );
};

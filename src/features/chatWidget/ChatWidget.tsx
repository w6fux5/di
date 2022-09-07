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
import { Button, Image } from 'antd';
import { ChangeEvent, useRef, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { resizeFile } from '@/utils/image-resize';

import { AuthUser } from '../auth';

import styles from './ChatWidget.module.less';
import { useChatWidgetSocket } from './hooks/useChatWidgetSocket';

type ChatWidgetProps = {
  user: AuthUser;
};

export const ChatWidget = ({ user }: ChatWidgetProps) => {
  const [showWidget, setShowWidget] = useState<boolean>(false);

  const { messageList, sendImg, sendText } = useChatWidgetSocket({ user });

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
    sendImg(image);
  };

  // send text
  const onSend = (message: string) => {
    sendText(message);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '3rem',
        height: '30rem',
        width: '320px',
      }}
    >
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
                  {messageList.map((message) => {
                    const {
                      Message: msg,
                      Sysdate,
                      Message_Role: role,
                      Message_Type: messageType,
                      id,
                    } = message;

                    console.log(id);

                    const direction = role === 1 ? 'outgoing' : 'incoming';
                    const timer = Sysdate.split(' ')[1].split(':').slice(0, -1).join(':');

                    if (messageType === 2) {
                      return (
                        <Message type="custom" key={id} model={{ direction, position: 'last' }}>
                          <Message.CustomContent>
                            <Image width={120} src={msg} />
                          </Message.CustomContent>
                          <Avatar src="https://picsum.photos/200/300" />
                          <Message.Footer sentTime={timer} />
                        </Message>
                      );
                    }

                    return (
                      <Message
                        key={id}
                        model={{
                          direction,
                          position: 'last',
                        }}
                      >
                        <Avatar src="https://picsum.photos/200/300" />
                        <Message.TextContent>{msg}</Message.TextContent>
                        <Message.Footer style={{ color: '#d9d9d9' }}>{timer}</Message.Footer>
                      </Message>
                    );
                  })}
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
          }}
          className={styles.button}
          shape="round"
          type="primary"
        >
          Message
        </Button>
      </section>
    </div>
  );
};

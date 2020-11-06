import * as React from 'react';
import '@chatui/core/dist/index.css';
import style from './style.less';
import apis from '@apis';
import { showToast } from '@components/Toast';
import Chat, { Bubble, useMessages } from '@chatui/core';
import { useMemo } from 'react';

interface IAppProps {
  onLogout: any;
}

const Component: React.FC<IAppProps> = props => {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const navRightContent = useMemo(() => {
    return [
      {
        type: 'sign-out',
        icon: 'sign-out',
        onClick: () => {
          apis.auth
            .logout()
            .then(() => {
              props.onLogout();
              showToast('登出成功');
            });
        }
      }
    ];
  }, []);

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: 'Bala bala' },
        });
      }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }
  return (
    <div className={style.container}>
      <Chat
        navbar={{
          title: '匿名聊天室',
          rightContent: navRightContent
        }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
    </div>
  );
};
Component.displayName = 'ChatModule';

export default Component;
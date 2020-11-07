import * as React from 'react';
import QueueAnim from 'rc-queue-anim';
import AuthModule from '@pages/AuthModule';
import ChatModule from '@pages/ChatModule';
import style from './style.less';
import apis from '@apis';
import Toast from '@components/Toast';
import { useEffect, useState, useCallback } from 'react';

const PENDING = Symbol('PENDING');
const PERMISSION = Symbol('PERMISSION');
const EXPIRED = Symbol('EXPIRED');

interface IAppProps {}

const Component: React.FC<IAppProps> = props => {
  const [type, setType] = useState<any>(PENDING);
  const [user, setUser] = useState<any>({});

  const onNavigationAuth = useCallback(() => {
    setUser({});
    setType(EXPIRED);
  }, []);
  const onNavigationChatRoom = useCallback(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = useCallback(() => {
    apis.auth
      .userInfo()
      .then(res => {
        setUser(res);
        setType(PERMISSION);
      })
      .catch(() => {
        setType(EXPIRED);
      });
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className={style.container}>
      {type === EXPIRED && (
        <QueueAnim type="alpha" duration={2000} delay={200}>
          <div key="00">
            <AuthModule onLogin={onNavigationChatRoom} />
          </div>
        </QueueAnim>
      )}
      {type === PERMISSION && (
        <QueueAnim type="alpha" duration={2000} delay={200}>
          <div key="10">
            <ChatModule onLogout={onNavigationAuth} user={user} />
          </div>
        </QueueAnim>
      )}
      <Toast />
    </div>
  );
};

Component.displayName = 'App';

export default Component;
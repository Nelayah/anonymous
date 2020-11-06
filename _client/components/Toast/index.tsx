import * as React from 'react';
import EE from 'onfire.js';
import style from './style.less';
import QueueAnim from 'rc-queue-anim';
import { useEffect, useRef, useState } from 'react';

const eventBus = new EE();
const INITIAL_STATE = { visible: false, text: '' };
const EVENT_KEY = 'TOAST';

export const showToast = data => {
  eventBus.fire(EVENT_KEY, data);
};

interface IAppProps {}

const Component: React.FC<IAppProps> = () => {
  const timer = useRef(null);
  const [toastProps, setToastProps] = useState<any>(INITIAL_STATE);

  useEffect(() => {
    eventBus.on(EVENT_KEY, text => {
      setToastProps({ visible: true, text });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setToastProps(INITIAL_STATE);
      }, 3000);
    });
    return () => {
      clearTimeout(timer.current);
      eventBus.off(EVENT_KEY);
    };
  }, []);

  return (
    <>
      {toastProps.visible && (
        <QueueAnim type="alpha">
          <div key="00" className={style.container}>
            <div className={style.toast}>{toastProps.text}</div>
          </div>
        </QueueAnim>
      )}
    </>
  );
};
Component.displayName = 'Toast';

export default Component;
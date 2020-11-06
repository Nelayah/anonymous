import * as React from 'react';
import md5 from 'md5';
import style from './style.less';
import lottie from 'lottie-web';
import QueueAnim from 'rc-queue-anim';
import apis from '@apis';
import { showToast } from '@components/Toast';
import { useSetState } from 'ahooks';
import { useEffect, useRef, useState, useCallback } from 'react';

interface IAppProps {
  onLogin: any;
}

const INITIAL_STATE = {
  username: '',
  pwd: '',
  confirmPwd: ''
};

const Component: React.FC<IAppProps> = React.forwardRef((props, _) => {
  const logoRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useSetState<any>(INITIAL_STATE);

  const onToggle  = useCallback(() => {
    setToggle(prev => !prev);
    setState(INITIAL_STATE);
  }, []);

  const onSubmit = useCallback(() => {
    if (!state.pwd || !state.username) return showToast('用户或密码不可为空');
    // 注册
    if (toggle) {
      if (state.pwd !== state.confirmPwd) return showToast('密码前后不一致');
      apis.auth
        .register({ name: state.username, password: md5(state.pwd) })
        .then(() => {
          setToggle(false);
          setState(INITIAL_STATE);
        })
        .catch(ret => {
          showToast(ret.msg);
        });
      return;
    }
    apis.auth
      .login({ name: state.username, password: md5(state.pwd) })
      .then(() => {
        showToast('登录成功');
        props.onLogin();
      })
      .catch(ret => {
        showToast(ret.msg);
      });
  }, [state, toggle]);

  useEffect(() => {
    lottie.loadAnimation({
      container: logoRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/files/lock.json'
    });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.logoWrapper}>
        <div className={style.logo} ref={logoRef}></div>
      </div>
      <div className={style.formGroup}>
        <input
          type="input"
          className={style.formField}
          placeholder="用户名"
          name="name"
          id="name"
          required
          value={state.username}
          onChange={e => setState({username: e.target.value})}
        />
        <label htmlFor="name" className={style.formLabel}>用户名</label>
      </div>
      <div className={style.formGroup}>
        <input
          type="password"
          className={style.formField}
          placeholder="密码"
          name="pwd"
          id="pwd"
          required
          value={state.pwd}
          onChange={e => setState({pwd: e.target.value})}
        />
        <label htmlFor="pwd" className={style.formLabel}>密码</label>
      </div>
      {toggle && (
        <QueueAnim duration={400}>
          <div className={style.formGroup} key="00">
            <input
              type="password"
              className={style.formField}
              placeholder="确认密码"
              name="confirmPwd"
              id="confirmPwd"
              required
              value={state.confirmPwd}
              onChange={e => setState({confirmPwd: e.target.value})}
            />
            <label htmlFor="confirmPwd" className={style.formLabel}>确认密码</label>
          </div>
        </QueueAnim>
      )}
      <div className={style.toggle} onTouchStart={onToggle}>切换到{toggle ? '登录' : '注册'}</div>
      <div className={style.btn} onTouchStart={onSubmit}>{!toggle ? '登录' : '注册'}</div>
    </div>
  );
});
Component.displayName = 'AuthModule';

export default Component;
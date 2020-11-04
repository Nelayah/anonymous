import * as React from 'react';
import AuthModule from '@pages/AuthModule';
import style from './style.less';

interface IAppProps {}

const Component: React.FC<IAppProps> = props => {
  return (
    <div className={style.container}>
      <AuthModule />
    </div>
  );
};
Component.displayName = 'App';

export default Component;
import * as React from 'react';
import style from './style.less';

interface IAppProps {}

const Component: React.FC<IAppProps> = props => {
  return (
    <div className={style.container}>Hello worlds</div>
  );
};
Component.displayName = 'App';

export default Component;
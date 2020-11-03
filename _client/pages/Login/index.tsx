import * as React from 'react';
import {observer} from 'mobx-react';
import {WrappedFormUtils} from 'antd/lib/form/Form';
import style from './style.less';
import entity from './entity';
import {
  Form,
  Input,
  Button
} from 'antd';
import { jumpTo } from '@util/history';

export interface IAppProps {
  form?: WrappedFormUtils;
}

export interface IAppState {
}

// @ts-ignore
@Form.create()
@observer
export default class extends React.Component<IAppProps, IAppState> {
  handleSubmit = ev => {
    ev.preventDefault();
    const {form} = this.props;
    form.validateFields((err, value) => {
      if (err) return;
      entity.login.fetch({
        ...value,
        sucCallback: () => jumpTo('/')
      });
    });
  }
  public render() {
    const {form} = this.props;
    return (
      <div className={style.devLogin}>
        {/* <div className={style.logo}>Login</div> */}
        <Form className={style.form}>
          <Form.Item>
            {form.getFieldDecorator('username')(
              <Input placeholder="请输入域账号" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className={style.btn}
              htmlType="submit"
              onClick={this.handleSubmit}
              disabled={!form.getFieldValue('username')}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
import * as R from 'ramda';
import * as React from 'react';
import * as io from 'socket.io-client';
import * as COSJS from 'cos-js-sdk-v5';
import QueueAnim from 'rc-queue-anim';
import '@chatui/core/dist/index.css';
import classnames from 'classnames';
import style from './style.less';
import apis from '@apis';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-bottts-sprites';
import uuid from 'uuid/v4';
import { showToast } from '@components/Toast';
import { useMemo, useEffect, useRef, useCallback, useState } from 'react';
import Chat, { Bubble, useMessages, Avatar, Image, Video, Icon, FileCard } from '@chatui/core';

const avatars = new Avatars(sprites, {base64: true});
const COS_CONFIG = {
  SecretId: 'AKIDg9bolRF1uWpthFKVfaEagY1D7g03NuiF',
  SecretKey: 'PWpshOncEXcR1LPJzQaSSAiywe5GLSLu'
};
const COS_OBJECT = {
  Bucket: 'intrerview-1252766420',
  Region: 'ap-nanjing'
};
interface IAppProps {
  onLogout: any;
  user: any;
}

const Component: React.FC<IAppProps> = props => {
  const socket = useRef(null);
  const cos = useRef(null);
  const fileRef = useRef(null);
  const toolbarRef = useRef(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<number>(0);
  const { messages, appendMsg, prependMsgs } = useMessages([]);
  // 退出聊天室
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

  // 消息预处理
  const onMsgPreHandle = msg => {
    return ({
      _id: msg.id,
      ...msg,
      position: msg.userId === props.user.id ? 'right' : 'left'
    });
  };

  // 触发附件上传
  const onToolbarClick = useCallback((item, ctx) => {
    toolbarRef.current = item;
    fileRef.current.click();
  }, []);

  // 附件上传
  const onFileChange = useCallback(ev => {
    const file: any = R.path(['target', 'files', '0'], ev);
    setFileKey(prev => prev + 1);
    if (!file) return;
    if (['image', 'video'].includes(toolbarRef.current.type) && file.type.indexOf(toolbarRef.current.type) === -1) return showToast('上传文件格式不符合要求，请重新上传');
    if (toolbarRef.current.type === 'video' && file.type !== 'video/mp4')  return showToast('上传文件格式不符合要求，请重新上传');

    const fileKey = uuid();
    setSpinning(true);
    cos.current.putObject({
      ...COS_OBJECT,
      Key: fileKey,
      StorageClass: 'STANDARD',
      Body: file
    }, (err, _) => {
      setSpinning(false);
      if (err) return showToast('上传文件失败');
      cos.current.getObjectUrl({
        ...COS_OBJECT,
          Key: fileKey,
          Expires: 365 * 24 * 3600 * 1000
      }, (err, data) => {
          if (err) return showToast('上传文件失败');
          socket.current.emit('message', {
            userId: props.user.id,
            type: toolbarRef.current.type,
            content: { text: data.Url, filename: file.name, fileSize: file.size }
          });
      });
    });
  }, []);

  // 发送消息
  const onSend = useCallback((type, val) => {
    if (type === 'text' && val.trim()) {
      socket.current.emit('message', {
        userId: props.user.id,
        type: 'text',
        content: { text: val }
      });
    }
  }, []);

  // 消息主体显示
  const renderMessageContent = msg => {
    const { content, type, position } = msg;
    const isLeft = position === 'left';
    const isRight = !isLeft;
    const base  = () => {
      return (
        <div className={classnames(style.userBaseInfo, {[style.paddingLeft]: isLeft, [style.paddingRight]: isRight})}>
          <Avatar src={avatars.create(msg.name)} alt={msg.name} />
          <div className={style.username}>{msg.name}</div>
        </div>
      );
    };
    return (
      <div className={style.textContainer}>
        {isLeft && base()}
        {type === 'text' && <Bubble content={content.text} />}
        {type === 'image' && <Bubble content={<Image src={content.text} lazy fluid  />} />}
        {type === 'video' && <Video src={content.text} />}
        {type === 'file' && (
          // @ts-ignore
          <FileCard file={{name: content.filename || '文件', size: content.fileSize || -1}}><a href={content.text}>下载</a></FileCard>
        )}
        {isRight && base()}
      </div>
    );
  };

  useEffect(() => {
    // 腾讯云对象存储，一般不推荐这么使用，只是为了演示使用
    cos.current = new COSJS(COS_CONFIG);
    // 建立 websocket 连接
    // @ts-ignore
    socket.current = io(location.origin);
    // 收到 server 的连接确认
    socket.current.on('open', () => {
      console.log('socket ping');
    });
    socket.current.on('broadcast', data => {
      appendMsg(onMsgPreHandle(data));
    });

    apis.messages
      .history()
      .then(res => {
        prependMsgs(res.map(onMsgPreHandle));
      });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className={style.container}>
      <Chat
        navbar={{
          title: '匿名聊天室',
          rightContent: navRightContent
        }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={onSend}
        onToolbarClick={onToolbarClick}
        toolbar={[
          {
            type: 'image',
            icon: 'image',
            title: '相册'
          },
          {
            type: 'video',
            icon: 'camera',
            title: '视频 mp4'
          },
          {
            type: 'file',
            icon: 'folder',
            title: '其他文件'
          }
        ]}
      />
      <input key={fileKey} ref={fileRef} type="file" onChange={onFileChange} style={{display: 'none'}}/>
      {spinning && (
        <QueueAnim type="alpha" duration={1500}>
          <div key="00" className={style.spinnerContainer}>
            <div className={style.spinner}>
              <Icon type="spinner" spin />
            </div>
          </div>
        </QueueAnim>
      )}
    </div>
  );
};
Component.displayName = 'ChatModule';

export default Component;
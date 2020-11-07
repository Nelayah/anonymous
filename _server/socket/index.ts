import * as uuid from 'uuid/v4';
import * as xss from 'xss';
import db from '@db';

export default io => {
  io.on('connection', client => {
    client.emit('open');
    client.on('message', data => {
      const user = db.get('users').find({ id: data.userId }).value();
      const msg = { id: uuid(), ...data, name: user.name, createdTime: Date.now() };
      // @ts-ignore
      // 防止 xss, 转义字符串
      if (msg.type === 'text') msg.content.text = xss(msg.content.text);

      db.get('messages').push(msg).write();

      client.broadcast.emit('broadcast', msg);
      client.emit('broadcast', msg);
    });
  });
};
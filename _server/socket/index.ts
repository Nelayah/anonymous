import {io} from '@root/_server/app';

// 监听 connect 事件
io.on('connection', socket => {
  socket.emit('open');
  // 通知客户端已连接
  console.log('connected');

  // 监听 disconnect 事件
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});
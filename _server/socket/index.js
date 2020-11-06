"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@root/_server/app");
// 监听 connect 事件
app_1.io.on('connection', socket => {
    socket.emit('open');
    // 通知客户端已连接
    console.log('connected');
    // 监听 disconnect 事件
    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});

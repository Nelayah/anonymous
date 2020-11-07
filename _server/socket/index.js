"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const xss = require("xss");
const _db_1 = require("@db");
exports.default = io => {
    io.on('connection', client => {
        client.emit('open');
        client.on('message', data => {
            const user = _db_1.default.get('users').find({ id: data.userId }).value();
            const msg = Object.assign(Object.assign({ id: uuid() }, data), { name: user.name, createdTime: Date.now() });
            // @ts-ignore
            // 防止 xss, 转义字符串
            if (msg.type === 'text')
                msg.content.text = xss(msg.content.text);
            _db_1.default.get('messages').push(msg).write();
            client.broadcast.emit('broadcast', msg);
            client.emit('broadcast', msg);
        });
    });
};

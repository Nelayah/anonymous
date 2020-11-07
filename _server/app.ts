import 'module-alias/register';
import * as Koa from 'koa';
import ip from '@util/ip';
import socket from '@socket/index';
import initKoaApp from '@util/initKoaApp';
import initKoaRouter from '@util/initKoaRouter';

const port = 3000;
const app = new Koa();
initKoaApp(app, initKoaRouter);

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

socket(io);

server.listen(port);

console.log(`http://localhost:${port}`);
console.log(`http://${ip()}:${port}`);

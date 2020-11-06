import 'module-alias/register';
import * as Koa from 'koa';
import * as http from 'http';
import initKoaApp from '@util/initKoaApp';
import initKoaRouter from '@util/initKoaRouter';

const port = 3000;
const app = new Koa();
initKoaApp(app, initKoaRouter);

const server = http.createServer(app.callback());
export const io = require('socket.io')(server);

server.listen(port);
console.log(`server is listening in ${port}`);
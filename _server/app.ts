import 'module-alias/register';
import * as Koa from 'koa';
import initKoaApp from '@util/initKoaApp';
import initKoaRouter from '@util/initKoaRouter';

const app = new Koa();
initKoaApp(app, initKoaRouter);
const port = 3000;
app.listen(port);
console.log(`server is listening in ${port}`);
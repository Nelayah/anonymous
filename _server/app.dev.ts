import 'module-alias/register';
import * as Koa from 'koa';
import * as webpack from 'webpack';
import * as koaWebpack from 'koa-webpack';
import * as convert from 'koa-convert';
import * as proxy from 'koa-proxy';
import webpackConfig from '@root/config/webpack.config';
import initKoaApp from '@util/initKoaApp';
import initKoaRouter from '@util/initKoaRouter';

(async () => {
  const app = new Koa();
  const compiler = webpack(webpackConfig);
  const port = 3001;

  koaWebpack({compiler}).then(middleware => {
    app
      .use(middleware)
      .use(convert(proxy({
        host: `http://localhost:${port}`,
        match: /^(?!\/(pages(\/.*)?)?$)/
      })));
      initKoaApp(app, initKoaRouter);
    app.listen(port);
    console.log(`server is listening in ${port}`);
  });
})();
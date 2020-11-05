import * as path from 'path';
import * as compress from 'koa-compress';
import * as serve from 'koa-static';
import * as koaBody from 'koa-better-body';
import * as session from 'koa-generic-session';
import * as convert from 'koa-convert';
import * as CSRF from 'koa-csrf';

/**
 * 初始化 koa app 实例，进行初始化配置
 *
 * @param {Object} app koa app 实例
 * @param {Object} router koa router
 */
export default (app, router) => {
  app.keys = ['chat_app-key1', 'chat_app-key2'];

  app
    .use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      ctx.set('X-Response-Time', `${ms}ms`);
    })
    .use(compress({
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }))
    .use(serve(path.join(__dirname, '../../public'), {
      maxage: 365 * 24 * 60 * 60 * 1000
    }))
    .use(session({
      // store: redisStore() 没有使用 redis 服务器，暂时移除
      key: 'koa.chat_system',
      cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        overwrite: true,
        signed: true
      }
    }))
    .use(new CSRF({
      invalidSessionSecretMessage: 'Invalid session secret',
      invalidSessionSecretStatusCode: 403,
      invalidTokenMessage: 'Invalid CSRF token',
      invalidTokenStatusCode: 403,
      excludedMethods: ['GET', 'HEAD', 'OPTIONS', 'POST'],
      disableQuery: false
    }))
    .use(convert(koaBody({
      patchKa: true,
      jsonLimit: '20mb',
      formLimit: '20mb',
      multipart: true,
      extendTypes: {
        json: ['application/json'],
        multipart: ['multipart/mixed', 'multipart/form-data']
      }
    })));

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
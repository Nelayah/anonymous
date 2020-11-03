import * as R from 'ramda';
/**
 * 登录状态和JWT有效校验，如果带有 tokenId 则自动生成特殊 JWT
 *
 * @param {Object} ctx koa context
 * @param {function} next Promise 函数
 */
export default async (ctx: Types.KoaContext, next) => {
  const isIfNeedLogin = !ctx.config.noAuthApis.reduce((prev, current) => prev || new RegExp(current).test(ctx.originalUrl), false);
    const {sso} = ctx.config;
    const timeOut = {
      errCode: 401,
      errMsg: '登录超时，请重新登录',
      redirectUrl: `${sso.baseUrl}/logout?service=${sso.service}`
    };
    const exists = await ctx.services.auth.authTokenExists();
    if (isIfNeedLogin && !exists) return ctx.messages(timeOut);
    await next();
    // JWT过期
    if (ctx.body.errCode !== '4100004') return;
    const authToken = ctx.cookies.get(ctx.config.authToken);
    await ctx.redis.del(authToken);
    ctx.cookies.set(ctx.config.authToken, '');
    return ctx.messages(timeOut);
};
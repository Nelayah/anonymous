import * as jsonwebtoken from 'jsonwebtoken';
import cache from '@cache';
import {
  COOKIE_KEY,
  JWT_PRIVATE_KEY
} from '@config/system';

const errRepText = { code: -1, status: 401, msg: '登录状态已过期，请重新登录' };
const errCallback = ctx => {
  ctx.status = 401;
  ctx.body = errRepText;
};
/**
 * 登录状态与 JWT 有效校验
 *
 * @param {Object} ctx koa context
 * @param {function} next Promise 函数
 */
export default async (ctx: Types.KoaContext, next) => {
  const cacheKey = ctx.cookies.get(COOKIE_KEY);

  // cookie 不存在
  if (cacheKey) return errCallback(ctx);

  const jwt = cache.get(cacheKey);

  // jwt 不存在
  if (!jwt)  return errCallback(ctx);

  // jwt 校验不通过
  try {
    jsonwebtoken.verify(jwt, JWT_PRIVATE_KEY);
  } catch (e) {
    return errCallback(ctx);
  }

  await next();
};
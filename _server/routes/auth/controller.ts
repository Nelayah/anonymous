import * as jsonwebtoken from 'jsonwebtoken';
import * as uuid from 'uuid/v4';
import cache from '@cache';
import db from '@db';
import {
  JWT_PRIVATE_KEY,
  JWT_TTL,
  CACHE_TTL,
  COOKIE_MAX_AGE,
  COOKIE_KEY
} from '@config/system';

/**
 * 权限校验相关
 *
 * @class Controller
 */
class Controller {
  /**
   * 登录接口
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public login = async (ctx: Types.KoaContext) => {
    const {name, password} = ctx.request.fields;
    if (!name || !password) {
      ctx.status = 400;
      return ctx.body = {
        code: -1,
        status: 400,
        data: null,
        msg: '用户名或密码不可为空'
      };
    }
    const data = db.get('users').find({name, password}).value();
    if (!data) {
      ctx.status = 401;
      ctx.body = {
        code: -1,
        status: 401,
        data: null,
        msg: '登录失败，请重新登录'
      };
      return;
    }
    // token based 登录状态保持
    const cacheKey = uuid();
    // 生成 jwt
    const jwt = jsonwebtoken.sign({id: data.id, name, password }, JWT_PRIVATE_KEY, { expiresIn: JWT_TTL });
    // 生成缓存映射关系
    cache.set(cacheKey, jwt, CACHE_TTL);
    ctx.cookies.set(COOKIE_KEY, cacheKey, { httpOnly: true, maxAge: COOKIE_MAX_AGE });

    ctx.body = { code: 0, status: 200, msg: '登陆成功', data: null };
  }
  /**
   * 注册接口
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public register = async (ctx: Types.KoaContext) => {
    const { name, password } = ctx.request.fields;
    if (!name || !password) {
      ctx.status = 400;
      return ctx.body = {
        code: -1,
        status: 400,
        data: null,
        msg: '用户名或密码不可为空'
      };
    }
    const data = db.get('users').find({ name, password }).value();
    if (data) {
      ctx.status = 400;
      return ctx.body = {
        code: -1,
        status: 400,
        data: null,
        msg: '注册失败，账号已存在'
      };
    }
    db.get('users')
      .push({ id: uuid(), name, password, createdTime: Date.now() })
      .write();
    ctx.body = { code: 0, status: 200, msg: '注册成功', data: null };
  }
  /**
   * 登出接口
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public logout = async (ctx: Types.KoaContext) => {
    const cacheKey = ctx.cookies.get(COOKIE_KEY);
    if (cacheKey) cache.del(cacheKey);
    ctx.cookies.set(COOKIE_KEY, null);

    ctx.body = { code: 0, status: 200, msg: null, data: null };
  }
  /**
   * 获取用户信息
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public user = async (ctx: Types.KoaContext) => {
    const cacheKey = ctx.cookies.get(COOKIE_KEY);
    const jwt = cache.get(cacheKey);
    const decoded = jsonwebtoken.verify(jwt, JWT_PRIVATE_KEY);
    const data = db.get('users').find({ id: decoded.id }).value();
    ctx.status = 200;
    ctx.body = {
      code: 0,
      status: 200,
      data,
      msg: null
    };
  }
}

export default new Controller();

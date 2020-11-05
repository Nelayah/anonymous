import db from '@db';
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
    const data = db.get('users').find({name, password}).value();
    if (!data) {
      ctx.status = 401;
      ctx.body = {
        code: -1,
        status: 401,
        msg: '登录失败，请重新登录'
      };
      return;
    }
    ctx.body = {code: 0, status: 200, msg: '登陆成功'};
  }
  /**
   * 注册接口
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public register = async (ctx: Types.KoaContext) => {
    const {name, password} = ctx.request.fields;
    const data = db.get('users').find({name, password}).value();
    if (data) {
      ctx.status = 400;
      ctx.body = {
        code: -1,
        status: 400,
        msg: '注册失败，账号已存在'
      };
      return;
    }
    db.get('users')
      .push({name, password})
      .write();
    ctx.body = {code: 0, status: 200, msg: '注册成功'};
  }
}

export default new Controller();

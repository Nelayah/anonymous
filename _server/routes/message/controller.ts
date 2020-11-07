import db from '@db';

/**
 * 消息相关
 *
 * @class Controller
 */
class Controller {
  /**
   * 历史消息
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public messages = async (ctx: Types.KoaContext) => {
    const data = db.get('messages').value();
    ctx.status = 200;
    ctx.body = { code: 0, status: 200, msg: '登陆成功', data };
  }
}

export default new Controller();

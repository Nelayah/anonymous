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
    return '404';
  }
  /**
   * 注册接口
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public register = async (ctx: Types.KoaContext) => {
    return '404';
  }
}

export default new Controller();

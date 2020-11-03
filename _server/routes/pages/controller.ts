import * as pug from 'pug';

/**
 * 页面访问
 *
 * @class Controller
 */
class Controller {
  /**
   * 将访问地址 “/” 重定向 ”/pages“
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public redirect = async (ctx: Types.KoaContext) => {
    ctx.redirect('/pages/index');
  }
  /**
   * 返回内嵌模版参数页面
   *
   * @memberof Controller
   * @public
   * @param {Object} ctx koa context
   */
  public render = async (ctx: Types.KoaContext) => {
    return ctx.body = pug.renderFile(`_server/view/index.pug`, {csrf: ctx.csrf});
  }
}

export default new Controller();
import * as request from 'superagent';
/**
 * BaseContextClass is a base class that can be extended,
 * it's instantiated in context level,
 *
 * {@link Service} is extending it.
 */
export default class {
  /**
   * koa Context
   *
   * @type {Object}
   * @protected
   */
  protected ctx;
  /**
   * koa app 实例
   *
   * @type {Object}
   * @protected
   */
  protected app;
  /**
   * 系统配置
   *
   * @type {Object}
   * @protected
   */
  protected config;
  /**
   * 系统服务
   *
   * @type {Object}
   * @protected
   */
  protected service;
  /**
   * 集成 superagent 方法
   *
   * @type {Object}
   * @protected
   */
  protected request;
  constructor(ctx?: Types.KoaContext) {
    this.request = request;
    if (!ctx) return;
    this.ctx = ctx;
    this.app = ctx.app;
  }
}
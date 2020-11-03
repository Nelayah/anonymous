"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 登录状态和JWT有效校验，如果带有 tokenId 则自动生成特殊 JWT
 *
 * @param {Object} ctx koa context
 * @param {function} next Promise 函数
 */
exports.default = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isIfNeedLogin = !ctx.config.noAuthApis.reduce((prev, current) => prev || new RegExp(current).test(ctx.originalUrl), false);
    const { sso } = ctx.config;
    const timeOut = {
        errCode: 401,
        errMsg: '登录超时，请重新登录',
        redirectUrl: `${sso.baseUrl}/logout?service=${sso.service}`
    };
    const exists = yield ctx.services.auth.authTokenExists();
    if (isIfNeedLogin && !exists)
        return ctx.messages(timeOut);
    yield next();
    // JWT过期
    if (ctx.body.errCode !== '4100004')
        return;
    const authToken = ctx.cookies.get(ctx.config.authToken);
    yield ctx.redis.del(authToken);
    ctx.cookies.set(ctx.config.authToken, '');
    return ctx.messages(timeOut);
});

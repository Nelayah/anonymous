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
const jsonwebtoken = require("jsonwebtoken");
const _cache_1 = require("@cache");
const system_1 = require("@config/system");
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
exports.default = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = ctx.cookies.get(system_1.COOKIE_KEY);
    // cookie 不存在
    if (cacheKey)
        return errCallback(ctx);
    const jwt = _cache_1.default.get(cacheKey);
    // jwt 不存在
    if (!jwt)
        return errCallback(ctx);
    // jwt 校验不通过
    try {
        jsonwebtoken.verify(jwt, system_1.JWT_PRIVATE_KEY);
    }
    catch (e) {
        return errCallback(ctx);
    }
    yield next();
});

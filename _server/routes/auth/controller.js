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
const uuid = require("uuid/v4");
const _cache_1 = require("@cache");
const _db_1 = require("@db");
const system_1 = require("@config/system");
/**
 * 权限校验相关
 *
 * @class Controller
 */
class Controller {
    constructor() {
        /**
         * 登录接口
         *
         * @memberof Controller
         * @public
         * @param {Object} ctx koa context
         */
        this.login = (ctx) => __awaiter(this, void 0, void 0, function* () {
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
            const data = _db_1.default.get('users').find({ name, password }).value();
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
            const jwt = jsonwebtoken.sign({ id: data.id, name, password }, system_1.JWT_PRIVATE_KEY, { expiresIn: system_1.JWT_TTL });
            // 生成缓存映射关系
            _cache_1.default.set(cacheKey, jwt, system_1.CACHE_TTL);
            ctx.cookies.set(system_1.COOKIE_KEY, cacheKey, { httpOnly: true, maxAge: system_1.COOKIE_MAX_AGE });
            ctx.body = { code: 0, status: 200, msg: '登陆成功', data: null };
        });
        /**
         * 注册接口
         *
         * @memberof Controller
         * @public
         * @param {Object} ctx koa context
         */
        this.register = (ctx) => __awaiter(this, void 0, void 0, function* () {
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
            const data = _db_1.default.get('users').find({ name, password }).value();
            if (data) {
                ctx.status = 400;
                return ctx.body = {
                    code: -1,
                    status: 400,
                    data: null,
                    msg: '注册失败，账号已存在'
                };
            }
            _db_1.default.get('users')
                .push({ id: uuid(), name, password, createdTime: Date.now() })
                .write();
            ctx.body = { code: 0, status: 200, msg: '注册成功', data: null };
        });
        /**
         * 登出接口
         *
         * @memberof Controller
         * @public
         * @param {Object} ctx koa context
         */
        this.logout = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const cacheKey = ctx.cookies.get(system_1.COOKIE_KEY);
            if (cacheKey)
                _cache_1.default.del(cacheKey);
            ctx.cookies.set(system_1.COOKIE_KEY, null);
            ctx.body = { code: 0, status: 200, msg: null, data: null };
        });
        /**
         * 获取用户信息
         *
         * @memberof Controller
         * @public
         * @param {Object} ctx koa context
         */
        this.user = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const cacheKey = ctx.cookies.get(system_1.COOKIE_KEY);
            const jwt = _cache_1.default.get(cacheKey);
            const decoded = jsonwebtoken.verify(jwt, system_1.JWT_PRIVATE_KEY);
            const data = _db_1.default.get('users').find({ id: decoded.id }).value();
            ctx.status = 200;
            ctx.body = {
                code: 0,
                status: 200,
                data,
                msg: null
            };
        });
    }
}
exports.default = new Controller();

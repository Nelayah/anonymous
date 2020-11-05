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
const _db_1 = require("@db");
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
            const data = _db_1.default.get('users').find({ name, password }).value();
            if (!data) {
                ctx.status = 401;
                ctx.body = {
                    code: -1,
                    status: 401,
                    msg: '登录失败，请重新登录'
                };
                return;
            }
            ctx.body = { code: 0, status: 200, msg: '登陆成功' };
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
            const data = _db_1.default.get('users').find({ name, password }).value();
            if (data) {
                ctx.status = 400;
                ctx.body = {
                    code: -1,
                    status: 400,
                    msg: '注册失败，账号已存在'
                };
                return;
            }
            _db_1.default.get('users')
                .push({ name, password })
                .write();
            ctx.body = { code: 0, status: 200, msg: '注册成功' };
        });
    }
}
exports.default = new Controller();

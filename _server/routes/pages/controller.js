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
const pug = require("pug");
/**
 * 页面访问
 *
 * @class Controller
 */
class Controller {
    constructor() {
        /**
         * 将访问地址 “/” 重定向 ”/pages“
         *
         * @memberof Controller
         * @public
         * @param {Object} ctx koa context
         */
        this.redirect = (ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.redirect('/pages/index');
        });
        /**
         * 返回内嵌模版参数页面
         *
         * @memberof Controller
         * @public
         * @param {Object} ctx koa context
         */
        this.render = (ctx) => __awaiter(this, void 0, void 0, function* () {
            return ctx.body = pug.renderFile(`_server/view/index.pug`, { csrf: ctx.csrf, env: process.env.NODE_ENV });
        });
    }
}
exports.default = new Controller();

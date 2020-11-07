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
 * 消息相关
 *
 * @class Controller
 */
class Controller {
    constructor() {
        /**
         * 历史消息
         *
         * @memberof Controller
         * @public
         * @param {Object} ctx koa context
         */
        this.messages = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const data = _db_1.default.get('messages').value();
            ctx.status = 200;
            ctx.body = { code: 0, status: 200, msg: '登陆成功', data };
        });
    }
}
exports.default = new Controller();

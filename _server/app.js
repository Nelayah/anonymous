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
require("module-alias/register");
const Koa = require("koa");
const initKoaApp_1 = require("@util/initKoaApp");
const initKoaRouter_1 = require("@util/initKoaRouter");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = new Koa();
    initKoaApp_1.default(app, initKoaRouter_1.default);
    const port = 3000;
    app.listen(port);
    console.log(`server is listening in ${port}`);
}))();

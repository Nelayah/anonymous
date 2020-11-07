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
const path = require("path");
const compress = require("koa-compress");
const serve = require("koa-static");
const koaBody = require("koa-better-body");
const session = require("koa-generic-session");
const convert = require("koa-convert");
const CSRF = require("koa-csrf");
/**
 * 初始化 koa app 实例，进行初始化配置
 *
 * @param {Object} app koa app 实例
 * @param {Object} router koa router
 */
exports.default = (app, router) => {
    app.keys = ['chat_app-key1', 'chat_app-key2'];
    app
        .use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        const start = Date.now();
        yield next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    }))
        .use(compress({
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }))
        .use(serve(path.join(__dirname, '../../public'), {
        maxage: 365 * 24 * 60 * 60 * 1000
    }))
        .use(session({
        // store: redisStore() 没有使用 redis 服务器，暂时移除
        key: 'koa.chat_system',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000,
            overwrite: true,
            signed: true
        }
    }))
        .use(new CSRF({
        invalidSessionSecretMessage: 'Invalid session secret',
        invalidSessionSecretStatusCode: 403,
        invalidTokenMessage: 'Invalid CSRF token',
        invalidTokenStatusCode: 403,
        excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
        disableQuery: false
    }))
        .use(convert(koaBody({
        patchKa: true,
        jsonLimit: '20mb',
        formLimit: '20mb',
        multipart: true,
        extendTypes: {
            json: ['application/json'],
            multipart: ['multipart/mixed', 'multipart/form-data']
        }
    })));
    app
        .use(router.routes())
        .use(router.allowedMethods());
};

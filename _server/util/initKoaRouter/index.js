"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const koaRouter = require("koa-router");
// 初始化 koa router
// 遍历 routes 目录下的配置，进行 koa router 初始化
const router = koaRouter();
fs.readdirSync(path.join(__dirname, '../../routes')).forEach(item => {
    const config = require(path.join(__dirname, `../../routes/${item}`)).default;
    config(router);
});
router.get('/*', ctx => ctx.body = '404 not found');
exports.default = router;

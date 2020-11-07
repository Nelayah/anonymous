"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const Koa = require("koa");
const webpack = require("webpack");
const koaWebpack = require("koa-webpack");
const convert = require("koa-convert");
const proxy = require("koa-proxy");
const webpack_config_1 = require("@root/config/webpack.config");
const initKoaApp_1 = require("@util/initKoaApp");
const initKoaRouter_1 = require("@util/initKoaRouter");
const app = new Koa();
const compiler = webpack(webpack_config_1.default);
const port = 3001;
koaWebpack({ compiler }).then(middleware => {
    app
        .use(middleware)
        .use(convert(proxy({
        host: `http://localhost:${port - 1}`,
        match: /^(?!\/(((pages)|(socket))(\/.*)?)?$)/
    })));
    initKoaApp_1.default(app, initKoaRouter_1.default);
    app.listen(port);
    console.log(`server is listening in ${port}`);
});

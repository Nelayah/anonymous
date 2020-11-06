"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 使用 node-cache 作为 redis 替代方案
const NodeCache = require("node-cache");
const cache = new NodeCache();
exports.default = cache;

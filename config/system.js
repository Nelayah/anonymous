"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// JWT 的签名密钥
exports.JWT_PRIVATE_KEY = 'com.chat-ui.sign.key';
// JWT 过期时间（1 天）
exports.JWT_TTL = '1d';
// 过期时间缓存（4 小时）
exports.CACHE_TTL = 4 * 3600;
// cookie Key
exports.COOKIE_KEY = 'chat.ck';
// cookie 有效时长（1 小时）
exports.COOKIE_MAX_AGE = 3600 * 1000;

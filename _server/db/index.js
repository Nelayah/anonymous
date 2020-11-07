"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 使用 lowdb 作为本地存储方案
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('localDB.json');
const db = low(adapter);
db.defaults({ messages: [], users: [] }).write();
exports.default = db;

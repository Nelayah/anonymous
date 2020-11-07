// 使用 lowdb 作为本地存储方案
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('localDB.json');
const db = low(adapter);

db.defaults({ messages: [], users: [] }).write();

export default db;
# Anonymous - 匿名聊天室

## Usage

```bash
$ git clone https://github.com/Nelayah/anonymous.git
$ cd anonymous
$ npm install
$ npm start
```

## Desc

技术选型：`React` + `Koa` + `socket.io` + `chatui`

本地存储：使用 lowdb 模拟实际数据库

缓存：使用 `node-cache` 作为 `redis` 的替代

文件存储：使用的是腾讯云的对象存储

登录状态维持方案：Token Based (JWT)

## Feature

> 注册 -> 登录 -> 进入聊天室 -> 退出登录

- 只有一个匿名聊天室，支持多人同时在线聊天
- 支持图片消息
- 支持 MP4 视频消息
- 支持其他文件上传并下载

## Attention

因为 `node-cache` 数据保存在内存，每次重启服务器将会清空 JWT 所映射的 KEY，即会让所有在线的人重新登录。
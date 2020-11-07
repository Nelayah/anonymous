"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const authentication_1 = require("@middleware/authentication");
exports.default = router => {
    router.get('/v1/messages', authentication_1.default, controller_1.default.messages);
};

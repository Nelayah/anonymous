"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.default = router => {
    router.post('/v1/auth/login', controller_1.default.login);
    router.post('/v1/auth/register', controller_1.default.register);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const authentication_1 = require("@middleware/authentication");
exports.default = router => {
    router.post('/v1/auth/login', controller_1.default.login);
    router.post('/v1/auth/logout', controller_1.default.logout);
    router.post('/v1/auth/register', controller_1.default.register);
    router.get('/v1/auth/user', authentication_1.default, controller_1.default.user);
};

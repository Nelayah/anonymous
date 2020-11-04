"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.default = router => {
    router.get('/login', controller_1.default.login);
    router.get('/register', controller_1.default.register);
};

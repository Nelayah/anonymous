"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("superagent");
/**
 * BaseContextClass is a base class that can be extended,
 * it's instantiated in context level,
 *
 * {@link Service} is extending it.
 */
class default_1 {
    constructor(ctx) {
        this.request = request;
        if (!ctx)
            return;
        this.ctx = ctx;
        this.app = ctx.app;
    }
}
exports.default = default_1;

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const os = require('os');
const ace = os.networkInterfaces();
exports.default = () => {
    let ip = '';
    Object.keys(ace).forEach(name => {
        ace[name].forEach(ac => {
            if ('IPv4' !== ac.family || ac.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            ip = ac.address;
        });
    });
    return ip;
};

"use strict";
exports.__esModule = true;
exports.envs = void 0;
var dotenv = require("dotenv");
var environment = (function () {
    var res = dotenv.config({
        path: __dirname + '/.env',
        debug: Boolean(process.env.DEBUG)
    });
    if (res.error) {
        throw res.error;
    }
    ;
    return {
        res: res
    };
})();
exports.envs = environment.res.parsed;

"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var router = express.Router();
exports.router = router;
var routes_1 = require("./watch/routes");
router.use('/watches', routes_1.router);

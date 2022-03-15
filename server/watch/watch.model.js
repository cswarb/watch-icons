"use strict";
exports.__esModule = true;
exports.Watch = void 0;
var mongoose = require("mongoose");
var watch_schema_1 = require("./watch.schema");
exports.Watch = mongoose.model('Watch', watch_schema_1.watchSchema);

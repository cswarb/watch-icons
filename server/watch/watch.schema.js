"use strict";
exports.__esModule = true;
exports.watchSchema = void 0;
var mongoose = require("mongoose");
var watchBreakdownSchema = new mongoose.Schema({
    description: String
});
var watchPriceSchema = new mongoose.Schema({
    from: String,
    to: String
});
exports.watchSchema = new mongoose.Schema({
    make: String,
    model: String,
    breakdown: [watchBreakdownSchema],
    noteableModels: [String],
    price: watchPriceSchema
});

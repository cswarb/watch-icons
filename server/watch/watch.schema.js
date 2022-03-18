"use strict";
exports.__esModule = true;
exports.watchSchema = void 0;
var mongoose = require("mongoose");
var watchBreakdownSchema = new mongoose.Schema({
    title: String,
    description: String
});
var watchPriceSchema = new mongoose.Schema({
    from: String,
    to: String
});
var watchNoteableModelsSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String
});
exports.watchSchema = new mongoose.Schema({
    make: String,
    model: String,
    shortname: String,
    breakdown: [watchBreakdownSchema],
    noteableModels: [watchNoteableModelsSchema],
    price: watchPriceSchema
});

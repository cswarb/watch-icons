"use strict";
exports.__esModule = true;
exports.watchSchema = void 0;
var mongoose = require("mongoose");
var watchBreakdownSchema = new mongoose.Schema({
    title: String,
    description: String
});
var watchPriceSchema = new mongoose.Schema({
    rrp: {
        from: String,
        to: String
    },
    market: {
        from: String,
        to: String
    }
});
var watchProductionYearsSchema = new mongoose.Schema({
    from: String,
    to: String
});
var watchNoteableModelsSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String
});
var watchStatFunctionSchema = new mongoose.Schema({
    name: String
});
var watchStatsSchema = new mongoose.Schema({
    components: Number,
    powerReserveHours: Number,
    functions: [watchStatFunctionSchema],
    productionNumbersPerYear: Number,
    productionYears: watchProductionYearsSchema
});
var watchBrandStatsSchema = new mongoose.Schema({
    productionNumbersPerYear: Number,
    revenuePerYear: Number,
    location: String,
    founding: Date,
    noteableAchievements: [
        {
            name: String
        }
    ],
    socialActivity: {
        instagram: {
            tagged: {
                name: String,
                value: Number,
                date: Date
            }
        }
    }
});
exports.watchSchema = new mongoose.Schema({
    make: String,
    model: String,
    shortname: String,
    breakdown: [watchBreakdownSchema],
    noteableModels: [watchNoteableModelsSchema],
    price: watchPriceSchema,
    watchStats: watchStatsSchema,
    brandStats: watchBrandStatsSchema
});

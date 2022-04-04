import * as mongoose from 'mongoose';

const watchBreakdownSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const watchPriceSchema = new mongoose.Schema({
    rrp: {
        from: {
            value: Number,
            currency: String
        },
        to: {
            value: Number,
            currency: String
        },
    },
    market: {
        from: {
            value: Number,
            currency: String
        },
        to: {
            value: Number,
            currency: String
        },
    },
});

const watchProductionYearsSchema = new mongoose.Schema({
    from: String,
    to: String,
});

const watchNoteableModelsSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
});

const watchStatFunctionSchema = new mongoose.Schema({
    name: String
});

const watchStatsSchema = new mongoose.Schema({
    components: Number,
    powerReserveHours: Number,
    functions: [ watchStatFunctionSchema ],
    productionNumbersPerYear: Number,
    productionYears: watchProductionYearsSchema,
});

const watchBrandStatsSchema = new mongoose.Schema({
    productionNumbersPerYear: Number,
    revenuePerYear: {
        value: Number,
        currency: String
    },
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
    },
});

export const watchSchema = new mongoose.Schema({
    make: String,
    model: String,
    shortname: String,
    breakdown: [ watchBreakdownSchema ],
    noteableModels: [ watchNoteableModelsSchema ],
    price: watchPriceSchema,
    watchStats: watchStatsSchema,
    brandStats: watchBrandStatsSchema
});

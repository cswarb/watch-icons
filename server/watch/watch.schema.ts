import * as mongoose from 'mongoose';

const watchBreakdownSchema = new mongoose.Schema({
    description: String,
});

const watchPriceSchema = new mongoose.Schema({
    from: String,
    to: String,
});

export const watchSchema = new mongoose.Schema({
    make: String,
    model: String,
    breakdown: [watchBreakdownSchema],
    noteableModels: [String],
    price: watchPriceSchema,
});
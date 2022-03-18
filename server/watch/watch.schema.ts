import * as mongoose from 'mongoose';

const watchBreakdownSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const watchPriceSchema = new mongoose.Schema({
    from: String,
    to: String,
});

const watchNoteableModelsSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
});

export const watchSchema = new mongoose.Schema({
    make: String,
    model: String,
    shortname: String,
    breakdown: [ watchBreakdownSchema ],
    noteableModels: [ watchNoteableModelsSchema ],
    price: watchPriceSchema,
});
"use strict";
exports.__esModule = true;
exports.WATCH_DB_FIXTURE = void 0;
var watch_model_1 = require("./watch.model");
var WATCH_DB_FIXTURE = function () {
    var ro = new watch_model_1.Watch({
        make: 'Audemars Piguet',
        model: 'Royal Oak 15202',
        shortname: 'jumbo',
        breakdown: [
            {
                description: 'good description 1'
            },
            {
                description: 'good description 2'
            },
            {
                description: 'good description 3'
            }
        ],
        noteableModels: ['2017'],
        price: {
            from: '0',
            to: '100'
        }
    });
    var lange = new watch_model_1.Watch({
        make: 'A Lange & Sohne',
        model: 'Zeitwerk',
        shortname: 'zeitwerk',
        breakdown: [
            {
                description: 'good description 4'
            }
        ],
        noteableModels: ['Lumen'],
        price: {
            from: '0',
            to: '1000'
        }
    });
    return [ro, lange];
};
exports.WATCH_DB_FIXTURE = WATCH_DB_FIXTURE;

"use strict";
exports.__esModule = true;
var express = require("express");
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
var schema = (0, graphql_1.buildSchema)("\n  type Query {\n    watch(id: ID!): Watch,\n    watches: [Watch],\n  }\n\n  type Watch {\n    id: ID!,\n    make: String,\n    model: String,\n    breakdown: [Breakdown],\n    noteableModels: [String],\n    price: Price,\n  }\n\n  type Breakdown {\n    description: String,\n  }\n\n  type Price {\n    start: Int,\n    end: Int,\n  }\n");
var root = {
    watch: function (props) {
        return {
            make: 'test',
            model: 'test'
        };
    },
    watches: function (props) {
        return [{
                make: 'test',
                model: 'test'
            }];
    }
};
var app = express();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, function () { return console.log('Now browse to localhost:4000/graphql'); });

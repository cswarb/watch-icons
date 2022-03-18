"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var routes_1 = require("./routes");
var dotenv = require("./config/environment");
var cors = require("cors");
var hydrate_db_1 = require("./watch/hydrate-db");
console.log('dotenv: ', dotenv);
mongoose
    .connect("mongodb://".concat(process.env.MONGO_HOST, ":").concat(process.env.MONGO_PORT, "/").concat(process.env.MONGO_DB))
    .then(function () {
    (0, hydrate_db_1.up)();
    var app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api', routes_1.router);
    var connection = app.listen(process.env.API_PORT, function () {
        console.log('Server has started');
    });
    connection.on('close', function () {
        (0, hydrate_db_1.down)();
    });
});

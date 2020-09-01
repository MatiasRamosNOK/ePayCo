"use strict";
var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB = "mongodb://localhost:27017/ePayCoMongo";
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

module.exports = db;

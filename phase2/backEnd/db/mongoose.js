'use strict';

//the mongoose database to be exported for the server

const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ProductAPI', { useNewUrlParser: true, useCreateIndex: true});

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ProductAPI'

mongoose.connect(mongoURI, { useNewUrlParser: true});


module.exports = { mongoose }
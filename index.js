const path = require('path');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');


// deepcode ignore UseCsurfForExpress: Just receive GET requests, without create any resources at server by Express.
const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;

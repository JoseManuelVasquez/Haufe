require("dotenv").config();
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { mongoDbMiddleware } = require('./middlewares/database');
var { cacheMiddleware } = require('./middlewares/cache');

var usersRouter = require('./routes/v1/user');
var charactersRouter = require('./routes/v1/character');

var app = express();

app.use(logger('dev'));
app.use(cors({origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');
app.use(mongoDbMiddleware); // MongoDB middleware
app.use(cacheMiddleware); // Cache middleware

app.use('/user', usersRouter);
app.use('/character', charactersRouter);

module.exports = app;

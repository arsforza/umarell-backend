require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

require('./configs/db.configs');
require('./configs/passport');

const app_name = require('./package.json').name;
const debug = require('debug')(
    `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./configs/session.config')(app);

app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: true,
        saveUninitialized: false,
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = process.env.LOCALS_TITLE;

require('./configs/cors.config')(app);

app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/forum.routes'));

module.exports = app;
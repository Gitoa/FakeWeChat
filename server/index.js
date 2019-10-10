"use strict";
exports.__esModule = true;
var express = require("express");
var session = require("express-session");
var socketIO = require("socket.io");
var utils_1 = require("./lib/utils");
var default_1 = require("./config/default");
var signin_1 = require("./routers/signin");
var signup_1 = require("./routers/signup");
var api_1 = require("./routers/api");
var logout_1 = require("./routers/logout");
//const path = require('path');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var bodyParser = require('body-parser');
var io = socketIO(server);
app.use('/static/img', express.static('../build/static/img', default_1.config.staticOption));
app.use('/static', express.static('../build/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: false
    }
}));
utils_1.initSocket(io);
app.use('/', signin_1["default"]);
app.use('/', signup_1["default"]);
app.use('/', api_1["default"]);
app.use('/', logout_1["default"]);
server.listen(3050, function () {
    console.log('listen on port 3050');
});

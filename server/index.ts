
import * as express from 'express';
import * as session from 'express-session';
import * as socketIO from 'socket.io';
import { initSocket } from './lib/utils';
import { config } from './config/default';
import signinRouter from './routers/signin';
import signupRouter from './routers/signup';
import apiRouter from './routers/api';
import logoutRouter from './routers/logout';

//const path = require('path');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
var bodyParser = require('body-parser');
const io = socketIO(server);

app.use('/static/img', express.static('../build/static/img', config.staticOption))
app.use('/static', express.static('../build/static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: false,
  }
}))

initSocket(io);

app.use('/', signinRouter);
app.use('/', signupRouter);
app.use('/', apiRouter);
app.use('/', logoutRouter);

server.listen(3080, () => {
  console.log('listen on port 3080');
})

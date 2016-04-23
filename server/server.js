'use strict';

const PORT = 5000;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var stormpath = require('express-stormpath');
var fs = require('fs');
var cors = require('cors');

require('dotenv').config();

var mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/seefood';

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log(`successfully connected to ${mongoUrl}`);
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(stormpath.init(app, {
  website: true,
  enableFacebook: true,
  social: {
    facebook: {
      appId: process.env.id,
      appSecret: process.env.secret,
    },
  },
}));

app.get('/', function(req, res) {
  var testPath = path.join(__dirname, 'test.html');
  res.sendFile(testPath);
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/restaurants', require('./routes/restaurants'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);

app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || PORT);
});
























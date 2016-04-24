'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

var router = express.Router();

var User = require('../models/user');
var Restaurant = require('../models/restaurant');

//get user
router.get('/', stormpath.isLoggedIn, function(req, res) {
	console.log('sup user');
	res.send('hey');
});

// app.get('/', stormpath.getUser, function (req, res) {
//   if (req.user) {
//     res.send('Hello, ' + req.user.email);
//   } else {
//     res.send('Not logged in');
//   }
// });

//create user
router.post('/', function(req, res) {
  User.create(req.body, function(err, user) {
    res.status(err ? 400 : 200).send(err || user);
  });
});

//logout user and clear cookies
router.post('/logout', function(req, res) {
	console.log('logout user');
	res.send();
});

module.exports = router;

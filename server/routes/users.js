'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

var router = express.Router();

var User = require('../models/user');
var Restaurant = require('../models/restaurant');

//get user
router.get('/', stormpath.isLoggedIn, function(req, res) {
	console.log('sup user');
	res.send(req.body);
});

//get restaurants
router.get('/', stormpath.isLoggedIn, function(req, res) {
	console.log('sup user');
	res.send(req.body);
});

//create user
router.post('/', function(req, res) {
  User.create(req.body, function(err, user) {
    res.status(err ? 400 : 200).send(err || user);
  });
});

router.post('/', stormpath.isLoggedIn, function(req, res) {
	res.send(req.body);
});

module.exports = router;

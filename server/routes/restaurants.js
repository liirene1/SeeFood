'use strict';

var express = require('express');
var router = express.Router();

var Restaurant = require('../models/Restaurant.js');

router.get('/', function(req, res) {
	console.log('gots');
	Restaurant.getResults(function(err, results) {
		console.log('error: ', err);
		console.log('results: ', results);
	});
});

module.exports = router;
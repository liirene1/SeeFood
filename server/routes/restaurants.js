'use strict';

var express = require('express');
var router = express.Router();

var Restaurant = require('../models/Restaurant.js');

router.get('/', function(req, res) {
	Restaurant.getResults(function(err, results) {
		console.log('results', results);
	});
});
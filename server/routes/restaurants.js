'use strict';

var express = require('express');
var router = express.Router();

var Restaurant = require('../models/Restaurant.js');

router.put('/', function(req, res) {
	Restaurant.getResults(req.body, function(err, results) {
		res.status(err ? 400 : 200).send(err || results)
	});
});

module.exports = router;

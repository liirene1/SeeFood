'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('sup user');
});

router.post('/', function(req, res) {
	// req.body.nah = 'doe';
	res.send(req.body);
});

module.exports = router;
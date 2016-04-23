'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('sup user');
});

router.post('/', function(req, res) {
	console.log('req.body: ', req.body.catsup);
});

module.exports = router;
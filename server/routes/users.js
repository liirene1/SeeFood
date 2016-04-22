'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('sup user');
});

module.exports = router;
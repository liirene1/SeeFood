'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('sup index');
});

module.exports = router;
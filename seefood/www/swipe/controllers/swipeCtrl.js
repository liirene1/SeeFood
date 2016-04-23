'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', function(SwipeService) {
	console.log('swipeCtrl');


	var myElement = document.getElementById('pic');

	var mc = new Hammer(myElement);

	mc.on("tap",
		function(ev) {
			console.log(ev.type);
		});

		// SwipeService.getOne;



})

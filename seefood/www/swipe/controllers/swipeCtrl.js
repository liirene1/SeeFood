'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', function($scope, HomeService, RestaurantService) {
	console.log('swipeCtrl');

	$scope.$watch(function() {
		return RestaurantService.restaurants;
	}, function(newVal, oldVal) {
		$scope.restaurants = newVal[0];
		console.log($scope.restaurants);
	});

	var myElement = document.getElementById('pic');
	var mc = new Hammer(myElement);

	mc.on("panright", function(ev) {
		console.log(ev.type);
	});
})

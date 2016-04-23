'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', function($scope, HomeService, RestaurantService) {
	console.log('swipeCtrl');

	$scope.$watch(function() {
		return RestaurantService.restaurants;
	}, function(newVal, oldVal) {
		$scope.restaurant = newVal[0];
		console.log('watch restaurant: ', $scope.restaurant);
	});

	var myElement = document.getElementById('pic');
	var mc = new Hammer(myElement);

	mc.on("swiperight", function(ev) {
		console.log(ev.type);
		RestaurantService.addLike();
		RestaurantService.swipeRestaurant();
		$scope.restaurant = null;
		$scope.restaurant = RestaurantService.grabRestaurant();
		$scope.$apply();
		console.log('scope restaurant: ', $scope.restaurant);
	});
})

'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', function($scope, RestaurantService, $state, $ionicLoading) {
	$scope.$watch(function() {
		return RestaurantService.restaurants;
	}, function(newVal, oldVal) {
		$ionicLoading.hide();
		$scope.restaurant = newVal[0];
	});

	var myElement = document.getElementById('pic');

	$scope.rejected = function() {
		RestaurantService.swipeRestaurant();
		$scope.restaurant = RestaurantService.grabRestaurant();
	}

	$scope.accepted = function() {
		RestaurantService.addLike();
		RestaurantService.swipeRestaurant();
		$scope.restaurant = RestaurantService.grabRestaurant();
	}

})

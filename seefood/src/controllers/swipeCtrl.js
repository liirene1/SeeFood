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
<<<<<<< HEAD
	// var mc = new Hammer(myElement);
  //
	// mc.on("swipeleft", function(ev) {
	// 	$scope.rejected();
	// 	$scope.$apply();
	// });
  //
	// mc.on("swiperight", function(ev) {
	// 	$scope.accepted();
	// 	$scope.$apply();
	// });
=======
>>>>>>> 557b741f4bd5fd263ddf2918fdf70db052ec2dba

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

'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', function($scope, HomeService, RestaurantService, $state, $ionicLoading) {
  console.log("i am in swipe state");
  $scope.$parent.state = $state.current.name;
  console.log('state: ', $state.current.name);

	$scope.$watch(function() {
    console.log('restaurant', RestaurantService.restaurants);
		return RestaurantService.restaurants;
	}, function(newVal, oldVal) {
		$ionicLoading.hide();
		console.log('newVal: ', newVal);
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

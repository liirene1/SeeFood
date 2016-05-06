'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', function($scope, HomeService, RestaurantService, $state, $ionicLoading) {
  console.log("i am in swipe state");
  $scope.$parent.state = $state.current.name;
	//$ionicLoading.show({ template: 'Loading...'})
  console.log('state: ', $state.current.name);

	$scope.$watch(function() {
    console.log('restaurant', RestaurantService.restaurants);
		return RestaurantService.restaurants;
	}, function(newVal, oldVal) {
		//$ionicLoading.hide();
		console.log('newVal: ', newVal);
		$scope.restaurant = newVal[0];
	});

	var myElement = document.getElementById('pic');
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

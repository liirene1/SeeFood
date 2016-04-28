'use strict';

var app = angular.module('seeFoodApp');

app.controller('detailCtrl', function($scope, $stateParams, RestaurantService, $state) {
  console.log('state: ', $state.current.name);
	$scope.$parent.state = $state.current.name;

	$scope.restaurant = RestaurantService.findLike($stateParams);
	console.log('detail resto: ', $scope.restaurant);

	$scope.distanceInMiles = function(meters) {
		return Math.round(meters * 0.000621371192);
	}

	console.log($scope.distanceInMiles($scope.restaurant.distance));
})

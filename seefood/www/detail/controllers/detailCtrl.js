'use strict';

var app = angular.module('seeFoodApp');

app.controller('detailCtrl', function($scope, $stateParams, RestaurantService) {
	$scope.restaurant = RestaurantService.findLike($stateParams);
	console.log('detail resto: ', $scope.restaurant);

	$scope.distanceInMiles = function(m) {
		return Math.round(m * 0.000621371192);
	}

	$scope.map = { center: {
		latitude: $scope.restaurant.location.coordinate.latitude,
		longitude: $scope.restaurant.location.coordinate.longitude },
		zoom: 8 };

});

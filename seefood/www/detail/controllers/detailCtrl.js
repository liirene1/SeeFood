'use strict';

var app = angular.module('seeFoodApp');

app.controller('detailCtrl', function($scope, $stateParams, RestaurantService) {
	$scope.restaurant = RestaurantService.findLike($stateParams);
	console.log('detail resto: ', $scope.restaurant);
})
'use strict';

var app = angular.module('seeFoodApp');

app.controller('listCtrl', function(RestaurantService, $scope, $state) {
	console.log('listCtrl');
	$scope.likes = RestaurantService.grabLikes();

	$scope.seeDetails = function(item) {
		$state.go('detail', {id: item.id})
	}
})

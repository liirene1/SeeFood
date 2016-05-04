'use strict';

var app = angular.module('seeFoodApp');

app.controller('listCtrl', function(RestaurantService, $scope, $state) {

  console.log('state: ', $state.current.name);
	$scope.$parent.state = $state.current.name;

	$scope.likes = RestaurantService.grabLikes();

	$scope.seeDetails = function(item) {  //use state params for this!
		$state.go('detail', {id: item.id})
	}
})
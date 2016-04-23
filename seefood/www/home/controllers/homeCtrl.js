'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, HomeService) {
	console.log('homeCtrl');

	$scope.fbLogin = function() {
		HomeService.fbLogin();
	}

})

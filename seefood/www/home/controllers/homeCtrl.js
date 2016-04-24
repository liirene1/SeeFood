'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, HomeService, UserService) {
	console.log('homeCtrl');

	$scope.fbLogin = function() {
		UserService.fbLogin();
	}

})

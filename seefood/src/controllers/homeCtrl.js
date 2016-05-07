'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, Auth, $state) {
	$scope.login = function(authMethod, $event) {
    Auth.$authWithOAuthPopup(authMethod)
		.then(function(authData) {
    }).catch(function(error) {
			$state.go("home");
    });
  };

	Auth.$onAuth(function(authData) {
		if (authData === null) {
			$state.go("home");
		} else {
			$state.go("swipe");
		}
		$scope.authData = authData;
	});
})

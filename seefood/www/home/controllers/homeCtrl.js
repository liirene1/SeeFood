'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, HomeService, Auth) {

	$scope.login = function(authMethod) {
    Auth.$authWithOAuthRedirect(authMethod).then(function(authData) {
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
        });
      } else {
        console.log(error);
      }
    });
  };

	Auth.$onAuth(function(authData) {
		if (authData === null) {
			console.log('Not logged in yet');
		} else {
			console.log('Logged in as', authData.uid);
		}
		$scope.authData = authData;
	});

})

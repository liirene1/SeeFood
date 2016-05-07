'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, HomeService, Auth, $state) {
  console.log('state: ', $state.current.name);
  $scope.$parent.state = $state.current.name;

	$scope.login = function(authMethod, $event) {
		console.log('login click working');
    // Auth.$authWithOAuthRedirect(authMethod)
    // var ref = cordova.InAppBrowser.open('http://apache.org', '_self', 'location=yes')
    Auth.$authWithOAuthPopup(authMethod)
		.then(function(authData) {
      // ref.close();
			// $state.go("swipe");
      console.log("in login function - swipe");
    }).catch(function(error) {
					$state.go("home");
					console.log('no FB login');
    });
  };

	Auth.$onAuth(function(authData) {
		console.log('auth working');
		if (authData === null) {
			console.log('Not logged in yet');
		} else {
			console.log('Logged in as', authData.uid);
			$state.go("swipe");
      console.log("homeCtrl onAuth state.go executed");
		}
		$scope.authData = authData;
		console.log('homeCtrl onAuth scope authData: ', $scope.authData);
	});
})

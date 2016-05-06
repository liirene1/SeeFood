'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, HomeService, Auth, $state) {
// app.controller('homeCtrl', function($scope, HomeService, Auth, $state, $ionicSlideBoxDelegate) {

  // $scope.nextSlide = function() {
  //  $ionicSlideBoxDelegate.next();
  // }
  //
  // $scope.toBeginning = function() {
  //   $ionicSlideBoxDelegate.slide(0);
  // }

  console.log('state: ', $state.current.name);
  $scope.$parent.state = $state.current.name;

	$scope.login = function(authMethod) {
		console.log('login click working');
    Auth.$authWithOAuthPopup(authMethod)
		.then(function(authData) {
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
      console.log("state.go executed");
		}
		$scope.authData = authData;
	});
})

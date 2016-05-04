'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, HomeService, Auth, $state) {

  $(document).ready(function(){
    $('.main-carousel').flickity({
      // options
      cellAlign: 'left',
      contain: true
    });
  });


  console.log('state: ', $state.current.name);
  $scope.$parent.state = $state.current.name;

	$scope.login = function(authMethod) {
		console.log('login click working');
    Auth.$authWithOAuthRedirect(authMethod)
		.then(function(authData) {
			$state.go("swipe");
      console.log("in login function - swipe");
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup(authMethod)
				.then(function(authData) {
					$state.go("swipe");
        });
      } else {
        console.log(error);
      }
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

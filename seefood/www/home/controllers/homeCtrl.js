'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', function($scope, HomeService, Auth) {
	console.log('homeCtrl');

	$scope.fbLogin = function() {
		HomeService.fbLogin();
	}

	$scope.login = function() {
		 console.log('fb button clicked');

		 var ref = new Firebase("https://seefoodapp.firebaseio.com");
			ref.authWithOAuthPopup("facebook", function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
			});
			// Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
			// 	// User successfully logged in
			// }).catch(function(error) {
			// 	if (error.code === "TRANSPORT_UNAVAILABLE") {
			// 		Auth.$authWithOAuthPopup("facebook").then(function(authData) {
			// 			// User successfully logged in. We can log to the console
			// 			// since we’re using a popup here
			// 			console.log(authData);
			// 		});
			// 	} else {
			// 		// Another error occurred
			// 		console.log(error);
			// 	}
			// });
	};

	Auth.$onAuth(function(authData) {
	 if (authData === null) {
		 console.log("Not logged in yet");
	 } else {
		 console.log("Logged in as", authData.uid);
	 }
	 $scope.authData = authData; // This will display the user's name in our view
 });

})

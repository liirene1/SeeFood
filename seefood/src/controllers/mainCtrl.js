'use strict';

var app = angular.module('seeFoodApp');

app.controller('mainCtrl', function($scope, $ionicModal, RestaurantService, Auth, $state) {

  $ionicModal.fromTemplateUrl('/filters/options.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modal = modal;
  });
  
	$scope.openModal = function() {
    $scope.modal.show();
  };
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  
  $scope.cancelModal = function() {
    $scope.modal.hide();
  };
  
  $scope.createFilter = function(filter) {
    RestaurantService.clearRestaurant();
  	RestaurantService.buildFilter(filter);
  	$scope.modal.hide();
  }

  $scope.logout = function() {
    Auth.$onAuth(function(authData) {
      authData = null;
      $scope.modal.hide();
      $state.go('home');
    })
  }

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('mainCtrl Not logged in yet');
    } else {
      console.log('mainCtrl Logged in as', authData.uid);
      $state.go('swipe');
    }
    $scope.authData = authData;
  });

});

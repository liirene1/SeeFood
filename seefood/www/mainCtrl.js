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

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('mainCtrl Not logged in yet');
      $state.go('home');
    } else {
      console.log('mainCtrl Logged in as', authData.uid);
      $state.go('swipe');
    }
    $scope.authData = authData;
  });

});

'use strict';

var app = angular.module('seeFoodApp');

app.controller('mainCtrl', function($scope, $ionicModal, RestaurantService, Auth, $state) {
  $ionicModal.fromTemplateUrl('filters/options.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modal = modal;
  }).catch(err => console.error('modal err: ', err));

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
    if(filter) {
      RestaurantService.clearRestaurant();
      RestaurantService.buildFilter(filter);
      $scope.modal.hide();
    }
  }

  $scope.logout = function() {
    $state.go('home');
    $scope.authData = null;
    window.localStorage.clear();
    $scope.modal.hide();
  }

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      $state.go('home');
    } else {
      $state.go('swipe');
    }
    $scope.authData = authData;
  });
});

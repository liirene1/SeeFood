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
    console.log('gimme dat filter: ', filter);
    if(filter) {
      RestaurantService.clearRestaurant();
      RestaurantService.buildFilter(filter);
      $scope.modal.hide();
    }
  }

  $scope.logout = function() {
    // Auth.$onAuth(function(authData) {
      console.log("logout authData: ", $scope.authData);
      $state.go('home');
      $scope.authData = null;
      window.localStorage.clear();
      $scope.modal.hide();
      console.log('window store: ', window.localStorage);
      console.log('authDate after unauth: ', $scope.authData);
    // })
  }

  Auth.$onAuth(function(authData) {
    console.log('onAuth authData: ', authData);
    if (authData === null) {
      console.log('null mainCtrl Not logged in yet');
      $state.go('home');
    } else if (authData === {}) {
      console.log('{} mainCtrl Not logged in yet');
      $state.go('home');
    } else {
      console.log('else mainCtrl Logged in as', authData.uid);
      $state.go('swipe');
    }
    $scope.authData = authData;
  });

});

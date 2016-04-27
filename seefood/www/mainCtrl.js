'use strict';

var app = angular.module('seeFoodApp');

app.controller('mainCtrl', function($scope, $ionicModal, RestaurantService) {

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
  	console.log(filter);
  	RestaurantService.buildFilter(filter);
  	$scope.modal.hide();
  }

});

'use strict';

var app = angular.module('seeFoodApp');

app.controller('mainCtrl', function($scope, $ionicModal, $state) {

	console.log('state: ', $state.current.name);

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
  	console.log('filter: ', $scope);
    $scope.modal.hide();
  };

  $scope.cancelModal = function() {
    $scope.modal.hide();
  };

  $scope.createFilter = function(filter) {
  	console.log(filter);
  	$scope.modal.hide();
  }

});

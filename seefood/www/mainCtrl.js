'use strict';

var app = angular.module('seeFoodApp');

app.controller('mainCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('/filters/options.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.createContact = function(u) {
      $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
      $scope.modal.hide();
    };
});

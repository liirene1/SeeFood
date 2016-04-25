'use strict';

var app = angular.module('seeFoodApp');

app.controller('LoginCtrl', function(LoginCtrl) {

  function LoginCtrl(Auth, $state) {
    this.loginWithGoogle = function loginWithGoogle() {
      Auth.$authWithOAuthPopup('google')
        .then(function(authData) {
          $state.go('tab.dash');
        });
    };
  }
  LoginCtrl.$inject = ['Auth', '$state'];
});

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

  var ref = new Firebase("http://seefoodapp.firebaseapp.com");
  ref.authWithOAuthRedirect("facebook", function(error) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      // We'll never get here, as the page will redirect on success.
      console.log("we'll never get here!");
      // $state.go("swipe");
    }
  });
});
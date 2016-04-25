'use strict';

var app = angular.module('seeFoodApp');

app.factory('Auth', Auth)

  function Auth(rootRef, $firebaseAuth) {
    return $firebaseAuth(rootRef);
  }
  Auth.$inject = ['rootRef', '$firebaseAuth'];
// });

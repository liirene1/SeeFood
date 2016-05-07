'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http) {
  console.log('homeService');
})

app.factory('Auth', function($firebaseAuth) {
  var endPoint = "https://seefoodapp.firebaseio.com";
  var usersRef = new Firebase(endPoint);
  return $firebaseAuth(usersRef);
})

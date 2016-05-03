'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http) { //CacheFactory, API

})

app.factory('Auth', function($firebaseAuth) {
  var endPoint = "https://seefoodapp.firebaseio.com";
  var usersRef = new Firebase(endPoint);
  return $firebaseAuth(usersRef);
})
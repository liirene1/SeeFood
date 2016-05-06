'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http) { //CacheFactory, API
<<<<<<< HEAD:seefood/www/home/services/homeService.js
  console.log('homeService');
=======

>>>>>>> 59d26b6f6f72db4ebdc618ef349bc9c7f2e71add:seefood/src/services/homeService.js
})

app.factory('Auth', function($firebaseAuth) {
  var endPoint = "https://seefoodapp.firebaseio.com";
  var usersRef = new Firebase(endPoint);
  return $firebaseAuth(usersRef);
})
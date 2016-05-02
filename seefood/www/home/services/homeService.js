'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http) { //CacheFactory, API
 // this.fbLogin = function() {
 // 	var catsup = { sup: 'doe' };
 // 	$http.post(`${API}/users`, catsup)
 // 	.then(res => console.log(res),
 // 				err => console.error(err))
 // };
})

app.factory('Auth', function($firebaseAuth) {
  var endPoint = "https://seefoodapp.firebaseio.com";
  var usersRef = new Firebase(endPoint);
  return $firebaseAuth(usersRef);
})

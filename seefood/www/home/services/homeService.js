'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http, API) {

 this.fbLogin = function() {
 	var catsup ={ sup: 'doe' };
 	$http.post(`${API}/users`, catsup)
 	.then(res => console.log(res),
 				err => console.error(err))
 };

})

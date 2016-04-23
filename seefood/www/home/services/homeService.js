'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http, API, CacheFactory) {


 this.fbLogin = function() {
 	var catsup = { sup: 'doe' };
 	$http.post(`${API}/users`, catsup)
 	.then(res => console.log(res),
 				err => console.error(err))
 };




 // if(!CacheFactory.get('restaurantCache')) {
 //  CacheFactory.createCache('restaurantCache', {
 // 	 deleteOnExpire: 'aggressive'
 //  });
 // }
 //
 //
 // var restaurantCache = CacheFactory.get('restaurantCache');
 //
 // console.log(restaurantCache);




})

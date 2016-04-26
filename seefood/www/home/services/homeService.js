'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http, API, CacheFactory) {


<<<<<<< HEAD
	this.getRestaurants = function(lat, lng) {
    var coordObj = {
    	lat: lat,
    	lng: lng
    }
    return $http.put(`${API}/restaurants`, coordObj);
 	}

 // this.fbLogin = function() {
 // 	var catsup ={ sup: 'doe' };
 // 	$http.post(`${API}/users`, catsup)
 // 	.then(res => console.log(res),
 // 				err => console.error(err))
 // };
=======
 this.fbLogin = function() {
 	var catsup = { sup: 'doe' };
 	$http.post(`${API}/users`, catsup)
 	.then(res => console.log(res),
 				err => console.error(err))
 };
>>>>>>> e19b73feaf4d2ba68f1e86e5679850f39cd93ec8




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

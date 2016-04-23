'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http, API) {

	this.getRestaurants = function(lat, lng) {
    var coordObj = {
    	lat: lat,
    	lng: lng
    }
    return $http.put(`${API()}/restaurants`, coordObj);
 	}

 this.fbLogin = function() {
 	var catsup ={ sup: 'doe' };
 	$http.post(`${API()}/users`, catsup)
 	.then(res => console.log(res),
 				err => console.error(err))
 };

})

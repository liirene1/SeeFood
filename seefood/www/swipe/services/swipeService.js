'use strict';

var app = angular.module('seeFoodApp');

app.service('SwipeService', function($http, API, RestaurantService) {
	this.getRestaurants = function(lat, lng) {
    var coordObj = {
    	lat: lat,
    	lng: lng
    }
    return $http.put(`${API}/restaurants`, coordObj)
    .then(function(res) {
    	RestaurantService.setRestaurants(res.data);
    	return res;
    }, err => console.error(err));
  }
});

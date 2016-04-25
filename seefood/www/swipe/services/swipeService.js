'use strict';

var app = angular.module('seeFoodApp');

app.service('SwipeService', function($http, API, RestaurantService) {
  
  this.coordObj = {};

  this.getRestaurants = function(lat, lng) {
    this.coordObj = {
    	lat: lat,
    	lng: lng
    }
    return $http.put(`${API}/restaurants`, this.coordObj)
    .then(function(res) {
    	RestaurantService.setRestaurants(res.data);
    	return res;
    }, err => console.error(err));
  }
});

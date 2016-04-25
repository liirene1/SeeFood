'use strict';

var app = angular.module('seeFoodApp');

app.service('SwipeService', function($http, API, RestaurantService) {

  this.coordObj = {
    count: 0
  };

	this.getRestaurants = function(lat, lng) {
    if(lat || lng) {
      this.coordObj = {
      	lat: lat,
      	lng: lng
      }
    }
    return $http.put(`${API}/restaurants`, this.coordObj)
    .then(function(res) {
      this.coordObj.count += res.data.business.length;
    	RestaurantService.setRestaurants(res.data);
    	return res;
    }, err => console.error(err));
  }
});

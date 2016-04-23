'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http, API) {

 this.getRestaurants = function(lat, lng) {
   var coordObj = {
     lat: lat,
     lng: lng
   }
   return $http.put(`${API}/restaurants`, coordObj);
 }

})

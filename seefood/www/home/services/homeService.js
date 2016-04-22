'use strict';

var app = angular.module('seeFoodApp');

app.service('HomeService', function($http) {

 this.getRestaurants = function(lat, lng) {
   var coordObj = {
     lat: lat,
     lng: lng
   }
   return $http.put('/restaurants', coordObj);
 }



})

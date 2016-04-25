'use strict';

var app = angular.module('seeFoodApp');

app.service('MiddleService', function(RestaurantService) {

  this.checkLength = function(arr) {
    if(arr.length < 5) {
      SwipeService.getRestaurants();
    }
  }




})

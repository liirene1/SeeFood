'use strict';

var app = angular.module('seeFoodApp');

app.service('SwipeService', function($http, API, CacheFactory) {


  this.getRestaurants = function(lat, lng) {
    var coordObj = {
      lat: lat,
      lng: lng
    }
    return $http.put(`${API}/restaurants`, coordObj);
  }


  this.getOne = function() {




  }

});



//
//   if(!CacheFactory.get('restaurantCache')) {
//     CacheFactory.createCache('restaurantCache', {
//       deleteOnExpire: 'aggressive'
//     });
//   }
//
//
//   var restaurantCache = CacheFactory.get('restaurantCache');
//
//   return {
//     getOne: function() {
//       return $http.get(`${API}/restaurants`)
//   }
//
// }

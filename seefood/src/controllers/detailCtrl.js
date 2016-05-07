'use strict';

var app = angular.module('seeFoodApp');

app.controller('detailCtrl', function($scope, $stateParams, RestaurantService, $state) {
  console.log("Im in detail state");
  console.log('state: ', $state.current.name);
  $scope.$parent.state = $state.current.name;

  $scope.restaurant = RestaurantService.findLike($stateParams);
  console.log('detail resto: ', $scope.restaurant);

  $scope.distanceInMiles = function(m) {
   return Math.round(m * 0.000621371192);
  }

  initMap();
  function initMap() {
    var myLatLng = {lat: $scope.restaurant.location.coordinate.latitude, lng: $scope.restaurant.location.coordinate.longitude};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }
});

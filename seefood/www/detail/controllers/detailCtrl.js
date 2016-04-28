'use strict';

var app = angular.module('seeFoodApp');

app.controller('detailCtrl', function($scope, $stateParams, RestaurantService) {
	$scope.restaurant = RestaurantService.findLike($stateParams);
	console.log('detail resto: ', $scope.restaurant);

	$scope.distanceInMiles = function(m) {
		return Math.round(m * 0.000621371192);
	}

	$scope.map = { center: {
		latitude: $scope.restaurant.location.coordinate.latitude,
		longitude: $scope.restaurant.location.coordinate.longitude },
		zoom: 12 };

	$scope.map.options = {
      draggable: false,
      labelContent: "lat: " + $scope.restaurant.location.coordinate.latitude + ' ' + 'lon: ' +  $scope.restaurant.location.coordinate.longitude,
      labelAnchor: "100 0",
      labelClass: "marker-labels"
    };

		var homeLatLng = new google.maps.LatLng($scope.restaurant.location.coordinate.latitude, $scope.restaurant.location.coordinate.longitude);

		var marker1 = new MarkerWithLabel({
       position: homeLatLng,
       draggable: true,
       raiseOnDrag: true,
       map: map,
       labelContent: "$425K",
       labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels", // the CSS class for the label
       labelStyle: {opacity: 0.75}
     });


		var iw1 = new google.maps.InfoWindow({
       content: $scope.restaurant.location.display_address[0] + "\n" + $scope.restaurant.location.display_address[1]
     });
     google.maps.event.addListener(marker1, "click", function (e) { iw1.open($scope.map, this); });

});

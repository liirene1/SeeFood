'use strict';

angular.module('seeFoodApp', ['ionic', 'ui.router', 'ngCordova', 'ngLodash', 'firebase', 'uiGmapgoogle-maps']).constant('FirebaseUrl', 'http://seefoodapp.firebaseapp.com').service('rootRef', ['FirebaseUrl', Firebase]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  stateProtection.$inject = ["Auth", "$state"];
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home/partials/home.html',
    controller: 'homeCtrl'
  }).state('swipe', {
    url: '/photos',
    templateUrl: './swipe/partials/swipe.html',
    controller: 'swipeCtrl',
    onEnter: stateProtection
  }).state('list', {
    url: '/list',
    templateUrl: './list/partials/list.html',
    controller: 'listCtrl',
    onEnter: stateProtection
  }).state('detail', {
    url: '/detail/:id',
    templateUrl: './detail/partials/detail.html',
    controller: 'detailCtrl',
    onEnter: stateProtection
  });

  $urlRouterProvider.otherwise('/');

  function stateProtection(Auth, $state) {
    Auth.$onAuth(function (authData) {
      if (authData === null) {
        $state.go('home');
      }
    });
  }
}]).constant('API', 'http://seefoodapp.herokuapp.com').run(["$ionicPlatform", "$cordovaGeolocation", "RestaurantService", function ($ionicPlatform, $cordovaGeolocation, RestaurantService) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    RestaurantService.findMe();
  });
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('detailCtrl', ["$scope", "$stateParams", "RestaurantService", "$state", function ($scope, $stateParams, RestaurantService, $state) {
  $scope.restaurant = RestaurantService.findLike($stateParams);

  $scope.distanceInMiles = function (m) {
    return Math.round(m * 0.000621371192);
  };

  initMap();
  function initMap() {
    var myLatLng = { lat: $scope.restaurant.location.coordinate.latitude, lng: $scope.restaurant.location.coordinate.longitude };

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
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', ["$scope", "Auth", "$state", function ($scope, Auth, $state) {
	$scope.login = function (authMethod, $event) {
		Auth.$authWithOAuthPopup(authMethod).then(function (authData) {}).catch(function (error) {
			$state.go("home");
		});
	};

	Auth.$onAuth(function (authData) {
		if (authData === null) {} else {
			$state.go("swipe");
		}
		$scope.authData = authData;
	});
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('listCtrl', ["RestaurantService", "$scope", "$state", function (RestaurantService, $scope, $state) {
	$scope.likes = RestaurantService.grabLikes();
	$scope.seeDetails = function (item) {
		$state.go('detail', { id: item.id });
	};
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('mainCtrl', ["$scope", "$ionicModal", "RestaurantService", "Auth", "$state", function ($scope, $ionicModal, RestaurantService, Auth, $state) {
  $ionicModal.fromTemplateUrl('filters/options.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  }).catch(function (err) {
    return console.error('modal err: ', err);
  });

  $scope.openModal = function () {
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.cancelModal = function () {
    $scope.modal.hide();
  };

  $scope.createFilter = function (filter) {
    if (filter) {
      RestaurantService.clearRestaurant();
      RestaurantService.buildFilter(filter);
      $scope.modal.hide();
    }
  };

  $scope.logout = function () {
    $state.go('home');
    $scope.authData = null;
    window.localStorage.clear();
    $scope.modal.hide();
  };

  Auth.$onAuth(function (authData) {
    if (authData === null) {
      $state.go('home');
    } else {
      $state.go('swipe');
    }
    $scope.authData = authData;
  });
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', ["$scope", "RestaurantService", "$state", "$ionicLoading", function ($scope, RestaurantService, $state, $ionicLoading) {
	$scope.$watch(function () {
		return RestaurantService.restaurants;
	}, function (newVal, oldVal) {
		$ionicLoading.hide();
		$scope.restaurant = newVal[0];
	});

	var myElement = document.getElementById('pic');

	$scope.rejected = function () {
		RestaurantService.swipeRestaurant();
		$scope.restaurant = RestaurantService.grabRestaurant();
	};

	$scope.accepted = function () {
		RestaurantService.addLike();
		RestaurantService.swipeRestaurant();
		$scope.restaurant = RestaurantService.grabRestaurant();
	};
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.factory('Auth', ["$firebaseAuth", function ($firebaseAuth) {
  var endPoint = "https://seefoodapp.firebaseio.com";
  var usersRef = new Firebase(endPoint);
  return $firebaseAuth(usersRef);
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.service('RestaurantService', ["$http", "API", "$cordovaGeolocation", function ($http, API, $cordovaGeolocation) {
	this.restaurants = [];
	this.likes = [];
	this.filterObj = {};

	this.findMe = function () {
		var _this = this;

		var posOptions = {
			enableHighAccuracy: true,
			timeout: 20000,
			maximumAge: 0
		};

		var geolocateTimer = window.setTimeout(function () {
			_this.filterObj = {
				lat: 37.5489946970847,
				lng: -121.9429642028612
			};
			_this.buildFilter(_this.filterObj);
		}, 10000);

		$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
			window.clearTimeout(geolocateTimer);
			_this.filterObj = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			_this.buildFilter(_this.filterObj);
		});
	};

	this.setRestaurants = function (data) {
		data.businesses = _.shuffle(data.businesses);
		this.restaurants = this.restaurants.concat(data.businesses);
	};

	this.swipeRestaurant = function () {
		this.restaurants.splice(0, 1);
		if (this.restaurants.length === 5) this.getRestaurants();
	};

	this.grabRestaurant = function () {
		return this.restaurants[0];
	};

	this.clearRestaurant = function () {
		this.restaurants = [];
	};

	this.grabLikes = function () {
		return this.likes;
	};

	this.addLike = function () {
		this.likes.push(this.restaurants[0]);
	};

	this.findLike = function (param) {
		for (var i = 0; i < this.likes.length; i++) {
			if (this.likes[i].id === param.id) return this.likes[i];
		}
	};

	this.buildFilter = function (obj) {
		var _this2 = this;

		var categories = [];
		this.filterObj.count = 0;
		this.filterObj.radius = obj.radius ? obj.radius * 1600 : 10 * 1600;
		this.filterObj.category = '';

		obj.glutenFree ? categories.push('gluten_free') : '';
		obj.vegetarian ? categories.push('vegetarian') : '';
		obj.vegan ? categories.push('vegan') : '';
		obj.kosher ? categories.push('kosher') : '';
		this.filterObj.category = categories.join(',');

		if (obj.location) {
			this.getCoords(obj.location).then(function (res) {
				_this2.filterObj.lat = res.data.results[0].geometry.location.lat;
				_this2.filterObj.lng = res.data.results[0].geometry.location.lng;
				_this2.getRestaurants();
			}, function (err) {
				console.error(err);
			});
		} else {
			this.getRestaurants();
		}
	};

	this.getRestaurants = function () {
		var _this3 = this;

		return $http.put(API + '/restaurants', this.filterObj).then(function (res) {
			res.data.businesses.forEach(function (ele, ind, arr) {
				if (!ele.image_url) {
					res.data.businesses.splice(arr.indexOf(ele), 1);
				} else {
					ele.image_url = ele.image_url.replace(/\S{2}(\.jpg)$/, 'o.jpg');
				}
			});

			_this3.filterObj.count += res.data.businesses.length;
			_this3.setRestaurants(res.data);
		}, function (err) {
			console.error(err);
		});
	};

	this.getCoords = function (address) {
		var urlAddress = address.split(' ').join('+');
		return $http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCVFibjTMF6wEQUlCV_O5zILn5urQUZ6Zo&address=' + urlAddress);
	};
}]);
'use strict';

angular.module('seeFoodApp', ['ionic', 'ui.router', 'ngCordova', 'ngLodash', 'firebase', 'uiGmapgoogle-maps']).constant('FirebaseUrl', 'http://seefoodapp.firebaseapp.com').service('rootRef', ['FirebaseUrl', Firebase]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  stateProtection.$inject = ["Auth", "$state"];
  console.log("config being hit");
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
  console.log('runs');
  $ionicPlatform.ready(function () {
    console.log('runs inside');
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
  console.log("Im in detail state");
  console.log('state: ', $state.current.name);
  $scope.$parent.state = $state.current.name;

  $scope.restaurant = RestaurantService.findLike($stateParams);
  console.log('detail resto: ', $scope.restaurant);

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

app.controller('homeCtrl', ["$scope", "HomeService", "Auth", "$state", function ($scope, HomeService, Auth, $state) {
	console.log('state: ', $state.current.name);
	$scope.$parent.state = $state.current.name;

	$scope.login = function (authMethod, $event) {
		console.log('login click working');
		Auth.$authWithOAuthPopup(authMethod).then(function (authData) {
			console.log("in login function - swipe");
		}).catch(function (error) {
			$state.go("home");
			console.log('no FB login');
		});
	};

	Auth.$onAuth(function (authData) {
		console.log('auth working');
		if (authData === null) {
			console.log('Not logged in yet');
		} else {
			console.log('Logged in as', authData.uid);
			$state.go("swipe");
			console.log("homeCtrl onAuth state.go executed");
		}
		$scope.authData = authData;
		console.log('homeCtrl onAuth scope authData: ', $scope.authData);
	});
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('listCtrl', ["RestaurantService", "$scope", "$state", function (RestaurantService, $scope, $state) {

	console.log('state: ', $state.current.name);
	$scope.$parent.state = $state.current.name;

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
    console.log('gimme dat filter: ', filter);
    if (filter) {
      RestaurantService.clearRestaurant();
      RestaurantService.buildFilter(filter);
      $scope.modal.hide();
    }
  };

  $scope.logout = function () {
    console.log("logout authData: ", $scope.authData);
    $state.go('home');
    $scope.authData = null;
    window.localStorage.clear();
    $scope.modal.hide();
    console.log('window store: ', window.localStorage);
    console.log('authDate after unauth: ', $scope.authData);
  };

  Auth.$onAuth(function (authData) {
    console.log('onAuth authData: ', authData);
    if (authData === null) {
      console.log('null mainCtrl Not logged in yet');
      $state.go('home');
    } else if (authData === {}) {
      console.log('{} mainCtrl Not logged in yet');
      $state.go('home');
    } else {
      console.log('else mainCtrl Logged in as', authData.uid);
      $state.go('swipe');
    }
    $scope.authData = authData;
  });
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('swipeCtrl', ["$scope", "HomeService", "RestaurantService", "$state", "$ionicLoading", function ($scope, HomeService, RestaurantService, $state, $ionicLoading) {
	console.log("i am in swipe state");
	$scope.$parent.state = $state.current.name;
	console.log('state: ', $state.current.name);

	$scope.$watch(function () {
		console.log('restaurant', RestaurantService.restaurants);
		return RestaurantService.restaurants;
	}, function (newVal, oldVal) {
		$ionicLoading.hide();
		console.log('newVal: ', newVal);
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

app.service('HomeService', ["$http", function ($http) {
  console.log('homeService');
}]);

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

		console.log('find me works');
		var posOptions = {
			enableHighAccuracy: true,
			timeout: 20000,
			maximumAge: 0
		};

		var geolocateTimer = window.setTimeout(function () {
			console.log('timer coords');
			_this.filterObj = {
				lat: 37.5489946970847,
				lng: -121.9429642028612
			};
			_this.buildFilter(_this.filterObj);
		}, 10000);

		$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
			window.clearTimeout(geolocateTimer);
			console.log('geolocator coords');
			_this.filterObj = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			console.log('filter: ', _this.filterObj);
			_this.buildFilter(_this.filterObj);
		});
	};

	this.setRestaurants = function (data) {
		console.log('data', data);
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

		console.log('filter works, obj: ', obj);
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

		console.log('filterObj: ', this.filterObj);
		return $http.put(API + '/restaurants', this.filterObj).then(function (res) {
			console.log(res.data.businesses);

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
'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

stateProtection.$inject = ["Auth", "$state"];
angular.module('seeFoodApp', ['ionic', 'firebase', 'ui.router', 'ngCordova'])
// angular.module('seeFoodApp', ['ionic', 'ui.router', 'ngCordova', 'hmTouchEvents', 'angular-cache', 'firebase', 'uiGmapgoogle-maps', 'homeCtrl'])
.constant('FirebaseUrl', 'http://seefoodapp.firebaseapp.com').service('rootRef', ['FirebaseUrl', Firebase]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  // .config(function($stateProvider, $urlRouterProvider, CacheFactoryProvider) {
  // angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

  console.log("config being hit");
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home/partials/home.html',
    controller: 'homeCtrl'
  }).state('swipe', {
    url: '/photos',
    templateUrl: './swipe/partials/swipe.html',
    controller: 'swipeCtrl',
    // resolve: {
    //   restaurants: ['RestaurantService', function(RestaurantService) {
    //     return RestaurantService.get();
    //   }]
    // },
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
  // .state('login', {
  //   url: '/login',
  //   templateUrl: './templates/login.html',
  //   controller: 'LoginCtrl as ctrl'
  // })
  // .state('email', {
  //   url: '/email',
  //   templateUrl: './email/partials/email.html',
  //   controller: 'emailCtrl'
  // })

  $urlRouterProvider.otherwise('/');
}]).constant('API', 'http://seefoodapp.herokuapp.com')

// .run(function($ionicPlatform, $cordovaGeolocation) {

.run(["$ionicPlatform", "$cordovaGeolocation", "RestaurantService", function ($ionicPlatform, $cordovaGeolocation, RestaurantService) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    RestaurantService.findMe();
  });
}]);

function stateProtection(Auth, $state) {
  Auth.$onAuth(function (authData) {
    if (authData === null) {
      $state.go('home');
    }
  });
}
'use strict';

var app = angular.module('seeFoodApp');

app.controller('detailCtrl', ["$scope", "$stateParams", "RestaurantService", "$state", function ($scope, $stateParams, RestaurantService, $state) {
  console.log("Im in detail state");
  // console.log('state: ', $state.current.name);
  // $scope.$parent.state = $state.current.name;
  //
  // $scope.restaurant = RestaurantService.findLike($stateParams);
  // console.log('detail resto: ', $scope.restaurant);
  //
  // $scope.distanceInMiles = function(m) {
  // 	return Math.round(m * 0.000621371192);
  // }
  //
  // $scope.map = { center: {
  // 	latitude: $scope.restaurant.location.coordinate.latitude,
  // 	longitude: $scope.restaurant.location.coordinate.longitude },
  // 	zoom: 12 };
  //
  // $scope.map.options = {
  //     draggable: false,
  //     labelContent: "lat: " + $scope.restaurant.location.coordinate.latitude + ' ' + 'lon: ' +  $scope.restaurant.location.coordinate.longitude,
  //     labelAnchor: "100 0",
  //     labelClass: "marker-labels"
  //   };

  // var homeLatLng = new google.maps.LatLng($scope.restaurant.location.coordinate.latitude, $scope.restaurant.location.coordinate.longitude);
  //
  // var marker1 = new MarkerWithLabel({
  //    position: homeLatLng,
  //    draggable: true,
  //    raiseOnDrag: true,
  //    map: map,
  //    labelContent: "$425K",
  //    labelAnchor: new google.maps.Point(22, 0),
  //    labelClass: "labels", // the CSS class for the label
  //    labelStyle: {opacity: 0.75}
  //  });
  //
  //
  // var iw1 = new google.maps.InfoWindow({
  //    content: $scope.restaurant.location.display_address[0] + "\n" + $scope.restaurant.location.display_address[1]
  //  });
  //  google.maps.event.addListener(marker1, "click", function (e) { iw1.open($scope.map, this); });
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('homeCtrl', ["$scope", "HomeService", "Auth", "$state", function ($scope, HomeService, Auth, $state) {
		console.log('state: ', $state.current.name);
		$scope.$parent.state = $state.current.name;

		$scope.login = function (authMethod) {
				console.log('login click working');
				Auth.$authWithOAuthRedirect(authMethod).then(function (authData) {
						$state.go("swipe");
						console.log("in login function - swipe");
				}).catch(function (error) {
						if (error.code === 'TRANSPORT_UNAVAILABLE') {
								Auth.$authWithOAuthPopup(authMethod).then(function (authData) {
										$state.go("swipe");
								});
						} else {
								console.log(error);
						}
				});
		};

		Auth.$onAuth(function (authData) {
				console.log('auth working');
				if (authData === null) {
						console.log('Not logged in yet');
				} else {
						console.log('Logged in as', authData.uid);
						$state.go("swipe");
						console.log("state.go executed");
				}
				$scope.authData = authData;
		});
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('listCtrl', ["RestaurantService", "$scope", "$state", function (RestaurantService, $scope, $state) {

	console.log('state: ', $state.current.name);
	$scope.$parent.state = $state.current.name;

	$scope.likes = RestaurantService.grabLikes();

	$scope.seeDetails = function (item) {
		//use state params for this!
		$state.go('detail', { id: item.id });
	};
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.controller('mainCtrl', ["$scope", "$ionicModal", "RestaurantService", "Auth", "$state", function ($scope, $ionicModal, RestaurantService, Auth, $state) {
  //app.controller('mainCtrl', function($scope, $ionicModal, RestaurantService, Auth, $state) {

  $ionicModal.fromTemplateUrl('/filters/options.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
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
    RestaurantService.clearRestaurant();
    RestaurantService.buildFilter(filter);
    $scope.modal.hide();
  };

  $scope.logout = function () {
    Auth.$onAuth(function (authData) {
      authData = null;
      $scope.modal.hide();
      $state.go('home');
    });
  };

  Auth.$onAuth(function (authData) {
    if (authData === null) {
      console.log('mainCtrl Not logged in yet');
    } else {
      console.log('mainCtrl Logged in as', authData.uid);
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
	//$ionicLoading.show({ template: 'Loading...'})
	console.log('state: ', $state.current.name);

	$scope.$watch(function () {
		console.log('restaurant', RestaurantService.restaurants);
		return RestaurantService.restaurants;
	}, function (newVal, oldVal) {
		$ionicLoading.hide();
		$scope.restaurant = newVal[0];
	});

	var myElement = document.getElementById('pic');
	// var mc = new Hammer(myElement);
	//
	// mc.on("swipeleft", function(ev) {
	// 	$scope.rejected();
	// 	$scope.$apply();
	// });
	//
	// mc.on("swiperight", function(ev) {
	// 	$scope.accepted();
	// 	$scope.$apply();
	// });

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

app.service('HomeService', ["$http", function ($http) {//CacheFactory, API
  // this.fbLogin = function() {
  // 	var catsup = { sup: 'doe' };
  // 	$http.post(`${API}/users`, catsup)
  // 	.then(res => console.log(res),
  // 				err => console.error(err))
  // };
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
		var posOptions = {
			enableHighAccuracy: true,
			timeout: 20000,
			maximumAge: 0
		};

		return $cordovaGeolocation.getCurrentPosition(posOptions).then(position => {
			this.filterObj = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			this.buildFilter(this.filterObj);
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
		var categories = [];
		this.filterObj.count = 0;
		this.filterObj.radius = obj.radius ? obj.radius * 1600 : 10 * 1600;
		this.filterObj.category = '';

		obj.glutenFree ? categories.push('gluten-free') : '';
		obj.vegetarian ? categories.push('vegetarian') : '';
		obj.vegan ? categories.push('vegan') : '';
		obj.kosher ? categories.push('kosher') : '';
		this.filterObj.category = categories.join(',');

		if (obj.location) {
			this.getCoords(obj.location).then(res => {
				this.filterObj.lat = res.data.results[0].geometry.location.lat;
				this.filterObj.lng = res.data.results[0].geometry.location.lng;
				this.getRestaurants();
			}, function (err) {
				console.error(err);
			});
		} else {
			this.getRestaurants();
		}
	};

	this.getRestaurants = function () {
		console.log('filterObj: ', this.filterObj);
		//$ionicLoading.show({ template: 'Loading...'})
		return $http.put(`${ API }/restaurants`, this.filterObj).then(res => {
			console.log(res.data.businesses);
			//$ionicLoading.hide();

			res.data.businesses.forEach((ele, ind, arr) => {
				if (!ele.image_url) {
					res.data.businesses.splice(arr.indexOf(ele), 1);
				} else {
					ele.image_url = ele.image_url.replace(/\S{2}(\.jpg)$/, 'o.jpg');
				}
			});

			this.filterObj.count += res.data.businesses.length;
			this.setRestaurants(res.data);
		}, function (err) {
			console.error(err);
		});
	};

	this.getCoords = function (address) {
		var urlAddress = address.split(' ').join('+');
		return $http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCVFibjTMF6wEQUlCV_O5zILn5urQUZ6Zo&address=${ urlAddress }`);
	};
}]);
'use strict';

var app = angular.module('seeFoodApp');

app.service('SwipeService', function () {});
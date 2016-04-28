// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('seeFoodApp', ['ionic', 'ui.router', 'ngCordova', 'hmTouchEvents', 'angular-cache', 'firebase'])

// angular.module('seeFoodApp'['starter', 'ionic', 'starter.controllers', 'starter.services', 'firebase'])
.constant('FirebaseUrl', 'http://seefoodapp.firebaseapp.com')
.service('rootRef', ['FirebaseUrl', Firebase])

.config(function($stateProvider, $urlRouterProvider, CacheFactoryProvider) {
  angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: './home/partials/home.html',
    controller: 'homeCtrl'
  })
  .state('swipe', {
    url: '/photos',
    templateUrl: './swipe/partials/swipe.html',
    controller: 'swipeCtrl'
  })
  .state('list', {
    url: '/list',
    templateUrl: './list/partials/list.html',
    controller: 'listCtrl'
  })
  .state('detail', {
    url: '/detail/:id',
    templateUrl: './detail/partials/detail.html',
    controller: 'detailCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: './templates/login.html',
    controller: 'LoginCtrl as ctrl'
  })
  .state('email', {
    url: '/email',
    templateUrl: './email/partials/email.html',
    controller: 'emailCtrl'
  })

  $urlRouterProvider.otherwise('/');
})

.constant('API', 'http://seefoodapp.herokuapp.com')

.run(function($ionicPlatform, $cordovaGeolocation, RestaurantService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    // $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    //   var coords = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   }
      RestaurantService.findMe();
    // });
  });
});

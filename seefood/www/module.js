// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('seeFoodApp', ['ionic', 'ui.router', 'ngCordova', 'hmTouchEvents', 'angular-cache'])

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



  $urlRouterProvider.otherwise('/');
})


.constant('API', 'http://seefoodapp.herokuapp.com')

.run(function($ionicPlatform, $cordovaGeolocation, SwipeService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
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

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            console.log(lat)
            console.log(long)

      SwipeService.getRestaurants(lat, long)
      .then(function(res) {
      }, function(err) {
        console.log('err:', err);
      });
    });
  });
});

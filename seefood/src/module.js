'use strict';

angular.module('seeFoodApp', ['ionic', 'ui.router', 'ngCordova', 'ngLodash', 'firebase', 'uiGmapgoogle-maps'])
.constant('FirebaseUrl', 'http://seefoodapp.firebaseapp.com')
.service('rootRef', ['FirebaseUrl', Firebase])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home/partials/home.html',
    controller: 'homeCtrl'
  })
  .state('swipe', {
    url: '/photos',
    templateUrl: './swipe/partials/swipe.html',
    controller: 'swipeCtrl',
    onEnter: stateProtection
  })
  .state('list', {
    url: '/list',
    templateUrl: './list/partials/list.html',
    controller: 'listCtrl'
    // onEnter: stateProtection
  })
  .state('detail', {
    url: '/detail/:id',
    templateUrl: './detail/partials/detail.html',
    controller: 'detailCtrl'
    // onEnter: stateProtection
  })

  $urlRouterProvider.otherwise('/');

  function stateProtection(Auth, $state) {
    Auth.$onAuth(function(authData) {
      if (authData === null) {
        $state.go('home');
      }
    })
  }
})

.constant('API', 'http://seefoodapp.herokuapp.com')

.run(function($ionicPlatform, $cordovaGeolocation, RestaurantService) {
  $ionicPlatform.ready(function() {
<<<<<<< HEAD
    console.log('runs inside');
=======
>>>>>>> 557b741f4bd5fd263ddf2918fdf70db052ec2dba
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    RestaurantService.findMe();
  });
});

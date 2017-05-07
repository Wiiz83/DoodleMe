'use strict';

angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/accueil', {
        templateUrl: '/accueil.html',
        controller: 'AccueilCtrl',
        controllerAs: 'accueil'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

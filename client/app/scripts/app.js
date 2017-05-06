'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
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
        templateUrl: 'views/accueil.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/register', {
        templateUrl: 'register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

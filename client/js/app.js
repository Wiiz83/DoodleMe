'use strict';

/**
 * @ngdoc overview
 * @name DoodleMe
 * @description
 * # DoodleMe
 *
 * Main module of the application.
 */
angular
  .module('DoodleMe', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/connexion.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



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
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/accueil', {
        templateUrl: '/views/accueil.html',
        controller: 'AccueilCtrl',
        controllerAs: 'accueil'
      })
      .when('/creerevenement', {
        templateUrl: '/views/creerevenement.html',
        controller: 'CreerEvenementCtrl',
        controllerAs: 'CreerEvenementCtrl'
      })
      .when('/mescreations', {
        templateUrl: '/views/mescreations.html',
        controller: 'MesCreationsCtrl',
        controllerAs: 'MesCreations'
      })
      .when('/evenement/:eventID', {
        templateUrl: '/views/evenement.html',
        controller: 'EventDetailsCtrl',
        controllerAs: 'EventDetailsCtrl'
    })
      .when('/mesparticipations', {
        templateUrl: '/views/mesparticipations.html',
        controller: 'MesParticipationsCtrl',
        controllerAs: 'MesParticipations'
      })
      .when('/mesnotifications', {
        templateUrl: '/views/mesnotifications.html',
        controller: 'MesNotificationsCtrl',
        controllerAs: 'MesNotifications'
      })
      .when('/moncompte', {
        templateUrl: '/views/moncompte.html',
        controller: 'MonCompteCtrl',
        controllerAs: 'MonCompte'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

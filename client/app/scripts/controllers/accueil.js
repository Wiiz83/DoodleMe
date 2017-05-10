'use strict';

 angular.module('clientApp')
 .controller('AccueilCtrl', function ($scope, $window, $rootScope, $location, $routeParams, eventService) {
	$scope.events = {};

    eventService.getAll(function(data){
        $scope.events = data;
    });
    
    $scope.viewEvent = function(eventID){
        $location.path('/evenement/'+eventID);
     };
});





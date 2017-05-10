'use strict';

 angular.module('clientApp')
 .controller('AccueilCtrl', function ($location, $scope,FactoryEvents) {
	$scope.events = {};

    FactoryEvents.getAll(function(data){
        $scope.events = data;
    });
    
    $scope.viewEvent = function(eventID){
        $location.path('/evenement/'+eventID);
     };
});





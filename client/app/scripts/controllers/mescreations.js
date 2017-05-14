'use strict';

 angular.module('clientApp')
 .controller('MesCreationsCtrl', function ($location, $scope, $cookieStore, FactoryEvent) {
	$scope.eventsOpened = {};
    $scope.eventsClosed = {};
    $scope.eventsArchived = {};
    var IDcreator = $cookieStore.get('id');

    FactoryEvent.getMyEventsOpened({id: IDcreator}, function(data){
        $scope.eventsOpened = data;
    });

    FactoryEvent.getMyEventsClosed({id: IDcreator}, function(data){
        $scope.eventsClosed = data;
    });

    FactoryEvent.getMyEventsArchived({id: IDcreator}, function(data){
        $scope.eventsArchived = data;
    });

    $scope.viewEvent = function(eventID){
        $location.path('/evenement/'+eventID);
     };


});





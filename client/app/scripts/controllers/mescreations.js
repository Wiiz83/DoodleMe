'use strict';

 angular.module('clientApp')
 .controller('MesCreationsCtrl', function ($location, $scope, $cookieStore, FactoryMyEventsOpened, FactoryMyEventsClosed, FactoryMyEventsArchived) {
	$scope.eventsOpened = {};
    $scope.eventsClosed = {};
    $scope.eventsArchived = {};
    var IDcreator = $cookieStore.get('id');

    FactoryMyEventsOpened.getAll({id: IDcreator}, function(data){
        $scope.eventsOpened = data;
    });

    FactoryMyEventsClosed.getAll({id: IDcreator}, function(data){
        $scope.eventsClosed = data;
    });

    FactoryMyEventsArchived.getAll({id: IDcreator}, function(data){
        $scope.eventsArchived = data;
    });

    $scope.viewEvent = function(eventID){
        $location.path('/evenement/'+eventID);
     };


});





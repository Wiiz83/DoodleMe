'use strict';

 angular.module('clientApp')
 .controller('EventDetailsCtrl', function ($routeParams,$scope, FactoryEvent, FactorySlot) {

    var eventID = $routeParams.eventID;
    console.log(eventID);

    FactoryEvent.getEvent({id: eventID}, function(dataevent) {
        $scope.event = dataevent;
        
        FactorySlot.getAll({id: eventID}, function(dataslots) {
             $scope.slots = dataslots;
        }, function(error) {
            $scope.errorMessage = response.data.description;
        });
            
    }, function(error) {
        $scope.errorMessage = response.data.description;
    });

});





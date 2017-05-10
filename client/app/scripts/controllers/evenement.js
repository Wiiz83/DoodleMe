'use strict';

 angular.module('clientApp')
 .controller('EventDetailsCtrl', function ($routeParams,$scope, FactoryEvent) {

    var eventID = $routeParams.eventID;
    console.log(eventID);

    FactoryEvent.getEvent({id: eventID}, function(data) {
        console.log("Passe");
        console.log(data);
        console.log(data.title);
        console.log(data.address);
    }, function(error) {
        $scope.errorMessage = response.data.description;
    });

});





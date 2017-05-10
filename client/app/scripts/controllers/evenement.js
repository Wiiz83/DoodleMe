'use strict';

 angular.module('clientApp')
 .controller('EventDetailsCtrl', function ($routeParams,$scope, FactoryEvents) {

    var eventID = $routeParams.eventID;
    console.log(eventID);

    FactoryEvents.get({id: eventID}, function(data) {
        console.log(data);
    }, function(error) {
        $scope.errorMessage = response.data.description;
    });

});





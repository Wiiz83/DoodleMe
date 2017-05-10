'use strict';

 angular.module('clientApp')
 .controller('EventCtrl', ['$location', '$routeParams', '$scope',function ($location,$routeParams,$scope, eventService) {

/*  var enventId = $routeParams.eventID;
  var paramValue = $location.search().eventID; 
  console.log($routeParams.eventID);
  var eventID = $routeParams.eventID;
  console.log(eventID);
*/
  var eventID = $routeParams.eventID;
  console.log(eventID);

  var monService = new eventService();
  monService.get({id: eventID}, function(response) {

  }, function(response) {
      $scope.errorMessage = response.data.description;
  });

}]);





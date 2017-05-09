'use strict';

 angular.module('clientApp')
 .controller('CreerEvenementCtrl', function ($scope, $window, $rootScope, $location, $routeParams, eventService) {

   $scope.template = "./views/includes/createEventStep1.html";

 	$scope.createEvent = function(){
        var objToSave = new eventService();
        objToSave.title = $scope.title;
        objToSave.address = $scope.address;
        objToSave.description = $scope.description;

        objToSave.$create(function(response) {
            $scope.template = "./views/includes/createEventStep2.html";
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };


});





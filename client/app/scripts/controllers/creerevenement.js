'use strict';

 angular.module('clientApp')
 .controller('CreerEvenementCtrl', function ($scope, $window, $rootScope, $location, $routeParams, FactoryEvents, $cookies,$cookieStore) {
  
  $scope.eventValid = 0;
  var eventID = "";

 	$scope.createEvent = function(){
        var objToSave = new FactoryEvents();
        objToSave.title = $scope.title;
        objToSave.address = $scope.address;
        objToSave.description = $scope.description;
        objToSave.creatorID = $cookieStore.get('id');

        objToSave.$create(function(response) {
            //eventID = response;
            $scope.eventValid = 1;
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };


 	$scope.refreshSlots = function(){
        var objToSave = new eventService();

        objToSave.$create(function(response) {
            $scope.eventValid = 1;
            refreshSlots();
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };

    $scope.createSlot = function(){
        var objToSave = new FactoryEvents();
        objToSave.eventID = eventID;
        objToSave.eventTime = $scope.eventTime;
        objToSave.eventDate = $scope.eventDate;
        objToSave.comment = $scope.eventComment;

        objToSave.$create(function(response) {
            $scope.eventValid = 1;
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };


});





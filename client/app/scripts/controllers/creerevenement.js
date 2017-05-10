'use strict';

 angular.module('clientApp')
 .controller('CreerEvenementCtrl', function ($scope, $window, $rootScope, $location, $routeParams, eventService, $cookies,$cookieStore) {
  
  $scope.eventValid = 0;

 	$scope.createEvent = function(){
        var objToSave = new eventService();
        objToSave.title = $scope.title;
        objToSave.address = $scope.address;
        objToSave.description = $scope.description;
        objToSave.creatorID = $cookieStore.get('id');

        objToSave.$create(function(response) {
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
        var objToSave = new eventService();
        objToSave.eventTime = $scope.eventTime;
        objToSave.eventDate = $scope.eventDate;
        objToSave.eventComment = $scope.eventComment;
        objToSave.creatorID = $cookieStore.get('id');

        objToSave.$create(function(response) {
            $scope.eventValid = 1;
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };


});





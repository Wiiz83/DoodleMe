'use strict';

 angular.module('clientApp')
 .controller('EventDetailsCtrl', function ($routeParams,$scope, FactoryEvent, FactoryEvents, FactorySlot, $cookies,$cookieStore) {

    var eventID = $routeParams.eventID;
    var isCreator = false;
    var eventEnCours = {};
    $scope.eventEdit = 0;

    FactoryEvent.getEvent({id: eventID}, function(dataevent) {
        $scope.event = dataevent;
        eventEnCours = dataevent;

        var IDcreator = dataevent.creatorID;
        if(IDcreator === $cookieStore.get('id')){
           $scope.isAdmin = false;
           isCreator = true;
        } else {
            $scope.isAdmin = true;
        }
        
        FactorySlot.getAll({id: eventID}, function(dataslots) {
             $scope.slots = dataslots;
        }, function(error) {
            $scope.errorMessage = response.data.description;
        });
            
    }, function(error) {
        $scope.errorMessage = response.data.description;
    });


  $scope.delete = function(){
     
  }

  $scope.close = function(){
      
  }

  $scope.edit = function(){
      $scope.eventEdit = 1;
      $scope.title = eventEnCours.title;
      $scope.address = eventEnCours.address;
      $scope.description = eventEnCours.description;
  }

  $scope.saveEvent = function(){

  }

  $scope.saveSlots = function(){

  }

  $scope.saveEvent = function(){
    var event = {title: $scope.title, description : $scope.description, address : $scope.address};

    FactoryEvent.updateEvent({id: eventID}, event, function(response) {
        $scope.eventEdit = 0;
    }, function(response) {
        $scope.errorMessage = response.data.description;
    });
  }

  $scope.undoEdit = function(){
    $scope.eventEdit = 0;
  }

});





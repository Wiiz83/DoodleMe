'use strict';

 angular.module('clientApp')
 .controller('EventDetailsCtrl', function ($routeParams, $scope, FactoryEvent, FactoryEvents, FactorySlot, $cookies,$cookieStore) {

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
        
        FactorySlot.getAll({EventID: eventID}, function(dataslots) {
             $scope.slots = dataslots;
        }, function(error) {
            $scope.errorMessage = response.data.description;
        });
            
    }, function(error) {
        $scope.errorMessage = response.data.description;
    });


  $scope.delete = function(){
    FactoryEvent.deleteEvent({id: eventID}, function(response) {
        $scope.myDisplay = 'none';
        $scope.successMessage = response.statut;
    }, function(error) {
        $scope.errorMessage = response.data.description;
    });
  }

  $scope.close = function(){
      
  }

  $scope.edit = function(){
      $scope.eventEdit = 1;
      $scope.title = eventEnCours.title;
      $scope.address = eventEnCours.address;
      $scope.description = eventEnCours.description;
  }

  
  $scope.editSlot = function(slotID){
    FactorySlot.get({id: slotID}, function(data) {
        var date = new Date(data[0].day);
        var heure = new Date(data[0].time);
        $scope.slotDate = date;
        $scope.slotTime = heure;
        $scope.slotComment = data[0].comment;
        angular.element('#myModalSlotEdit').modal('show');
    }, function(error) {
        $scope.errorMessage = error.data.description;
    });
  }


  $scope.deleteSlot = function(slotID){
    FactorySlot.delete({id: slotID}, function(response) {
        $scope.successMessage = response.statut;
        FactorySlot.getAll({EventID: eventID}, function(dataslots) {
             $scope.slots = dataslots;
        }, function(error) {
            $scope.errorMessage = error.data.description;
        });
    }, function(error) {
        $scope.errorMessage = error.data.description;
    });
  }


   $scope.createSlot = function(){
    var objToSave = new FactorySlot();
    objToSave.eventID = eventID;
    objToSave.time = angular.element('#eventTime').val();
    objToSave.day = angular.element('#eventDate').val();
    objToSave.comment = $scope.eventComment;
    objToSave.$create(function(response) {
        angular.element('#myModalSlot').modal('hide');
        $scope.successMessage = "Création du créneau effectuée.";
        FactorySlot.getAll({EventID: eventID}, function(dataslots) {
             $scope.slots = dataslots;
        }, function(error) {
            $scope.errorMessage = response.data.description;
        });
    }, function(response) {
        $scope.errorMessage = response.data.description;
    });
  };

  $scope.saveEvent = function(){
    var event = {title: $scope.title, description : $scope.description, address : $scope.address};

    FactoryEvent.updateEvent({id: eventID}, event, function(response) {
        $scope.eventEdit = 0;
    }, function(response) {
        $scope.errorMessage = response.data.description;
    });
  }


});





'use strict';

 angular.module('clientApp')
 .controller('EventDetailsCtrl', function ($routeParams, $scope, FactoryEvent, FactoryEvents, FactorySlot, $cookies,$cookieStore) {

    var eventID = $routeParams.eventID;
    var isCreator = false;
    var eventEnCours = {};
    var slotEnCours = {};
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

  $scope.closeEvent = function(){
    var slotChoisi = $scope.slotListe;
    FactoryEvents.close({id: eventID, slotID: slotChoisi}, function(response) {
        angular.element('#myModalCloture').modal('hide');
        $scope.successMessage = "Clôture de l'événement effectuée.";
    }, function(response) {
        console.log(response);
        console.log(response.data.description);
        $scope.errorMessage = response.data.description;
    });
  }

  $scope.edit = function(){
      $scope.eventEdit = 1;
      $scope.title = eventEnCours.title;
      $scope.address = eventEnCours.address;
      $scope.description = eventEnCours.description;
  }

  $scope.updateSlot = function(){
    var eventSlot = {day: angular.element('#slotDate').val(), time : angular.element('#slotTime').val(), comment : $scope.slotComment};

    FactorySlot.update({id: slotEnCours}, eventSlot,  function(response) {
        angular.element('#myModalSlotEdit').modal('hide');
        $scope.successMessage = "Modification du créneau effectuée.";
        FactorySlot.getAll({EventID: eventID}, function(dataslots) {
             $scope.slots = dataslots;
        }, function(error) {
            $scope.errorMessage = response.data.description;
        });
    }, function(response) {
        $scope.errorMessage = response.data.description;
    });
  }

  $scope.undoEdit = function(){
     $scope.eventEdit = 0;
   }

  
  $scope.editSlot = function(slotID){
    slotEnCours = slotID;
    FactorySlot.get({id: slotID}, function(data) {
        var date = new Date(data.day);
        var heure = new Date(data.time);
        $scope.timeSlot = data.time;
        $scope.slotDate = date;
        $scope.slotComment = data.comment;
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





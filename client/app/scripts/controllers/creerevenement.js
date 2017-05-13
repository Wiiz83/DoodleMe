'use strict';

 angular.module('clientApp')
 .controller('CreerEvenementCtrl', function ($scope, $window, $rootScope, $location, $routeParams, FactoryEvents, FactorySlot, $cookies,$cookieStore) {
  
    $scope.eventValid = 0;
    var eventEnCours = "";
    var slotEnCours = "";

 	$scope.createEvent = function(){
        var objToSave = new FactoryEvents();
        objToSave.title = $scope.title;
        objToSave.address = $scope.address;
        objToSave.description = $scope.description;
        objToSave.creatorID = $cookieStore.get('id');

        objToSave.$create(function(response) {
            $scope.eventValid = 1;
            eventEnCours = response.description;
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };

/*
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
    }*/

      /*
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
  }*/

   $scope.createSlot = function(){
    var objToSave = new FactorySlot();
    objToSave.eventID = eventEnCours;
    objToSave.time = angular.element('#eventTime').val();
    objToSave.day = angular.element('#eventDate').val();
    objToSave.comment = $scope.eventComment;

    objToSave.$create(function(response) {
        angular.element('#myModalSlot').modal('hide');
        $scope.successMessage = "Création du créneau effectuée.";

        FactorySlot.getAll({EventID: eventEnCours}, function(dataslots) {
           
              $scope.slots = dataslots;
               console.log(dataslots);
                console.log($scope.slots);
        }, function(error) {
            $scope.errorMessage = response.data.description;
        });
    }, function(response) {
        $scope.errorMessage = response.data.description;
    });
  };

});





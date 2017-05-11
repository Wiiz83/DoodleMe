'use strict';

 angular.module('clientApp')
 .controller('EventDetailsCtrl', function ($routeParams,$scope, FactoryEvent, FactorySlot, $cookies,$cookieStore) {

    var eventID = $routeParams.eventID;
    var isCreator = false;

    FactoryEvent.getEvent({id: eventID}, function(dataevent) {
        $scope.event = dataevent;
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
      
  }

  $scope.saveEvent = function(){

  }

  $scope.saveSlots = function(){

  }

});





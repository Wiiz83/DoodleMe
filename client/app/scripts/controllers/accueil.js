'use strict';

 angular.module('clientApp')
 .controller('AccueilCtrl', function ($location, $scope,FactoryEvent, dataService) {
	$scope.events = {};

	var globalData = dataService.getData();
  
    switch (globalData) {
        case "deleteSuccess":
            $scope.successMessage = "Suppression réussie.";
            dataService.setData("");
        break;
    
        default:
        break;
    }

    FactoryEvent.getAll(function(data){
        $scope.events = data;
    });
    
    $scope.viewEvent = function(eventID){
        $location.path('/evenement/'+eventID);
     };
});





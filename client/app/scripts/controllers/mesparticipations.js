'use strict';

 angular.module('clientApp')
 .controller('MesParticipationsCtrl', function ($location, $scope, $cookieStore, FactoryEvent) {
	$scope.participationsOpened = {};
    $scope.participationsClosed = {};
    $scope.participationsArchived = {};
    var IDcreator = $cookieStore.get('id');

    FactoryEvent.getMyParticipationsOpened({id: IDcreator}, function(data){
        $scope.participationsOpened = data;
    });

    FactoryEvent.getMyParticipationsClosed({id: IDcreator}, function(data){
        $scope.participationsClosed = data;
    });

    FactoryEvent.getMyParticipationsArchived({id: IDcreator}, function(data){
        $scope.participationsArchived = data;
    });

    $scope.viewEvent = function(eventID){
        $location.path('/evenement/'+eventID);
     };


});





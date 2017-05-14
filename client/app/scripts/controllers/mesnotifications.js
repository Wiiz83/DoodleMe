'use strict';

 angular.module('clientApp')
 .controller('MesNotificationsCtrl', function ($scope, $cookieStore, FactoryNotifications) {
	$scope.eventsNotified = {};
    var currentUser = $cookieStore.get('id');

    FactoryNotifications.getAll({userID: currentUser}, function(data){
        $scope.eventsNotified = data;
    });

    var read = {userID: userEnCours};

    FactoryNotifications.markAsRead(read, function(data){
        console.log(data);
    }, function (response) {
        console.log(response);
        $scope.errorMessage = response.data.description;
    });


});





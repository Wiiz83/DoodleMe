'use strict';

 angular.module('clientApp')
 .controller('MesNotificationsCtrl', function ($scope, $cookieStore, $route, FactoryNotifications) {
	$scope.eventsNotified = {};
    var currentUser = $cookieStore.get('id');

    FactoryNotifications.getAll({userID: currentUser}, function(data){
        $scope.eventsNotified = data;
    });

    $scope.markRead = function (eventID) {
        var read = {userID: currentUser, eventID: eventID};
        FactoryNotifications.markAsRead(read, function(data){
              $route.reload();
        }, function (response) {
            $scope.errorMessage = response.data.description;
        });
    }

    $scope.markAllRead = function () {
        FactoryNotifications.markAllAsRead({userID: currentUser}, function(data){
              $route.reload();
        }, function (response) {
            $scope.errorMessage = response.data.description;
        });
    }


});





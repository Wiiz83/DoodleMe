'use strict';

 angular.module('clientApp')
 .directive('navBar', function () {
 	return {
 		templateUrl: 'views/directives/header.html',
 		restrict: 'E',
 		controller: function($scope, $location, $cookieStore, FactoryNotifications, dataService) {

 			var currentUser = $cookieStore.get('id');
			 var notif = 0;
			 $scope.MonID = currentUser;

			 if(currentUser == undefined){
				 dataService.setData("notConnected");
				 $location.path(''); 
			 }

			FactoryNotifications.getCompteur({userID: currentUser}, function(data){
				if(data.nb_notifications != 0){
					$scope.numberNotif = data.nb_notifications;
					$scope.notif = 1;
				} 
			});

 			$scope.isActive = function (viewLocation) { 
 				return viewLocation === $location.path();
 			};

 		}
 	};
 });

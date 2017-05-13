'use strict';

 angular.module('clientApp')
 .directive('navBar', function () {
 	return {
 		templateUrl: 'views/directives/header.html',
 		restrict: 'E',
 		controller: function($scope, $location, $cookieStore, FactoryNotifications) {

 			var currentUser = $cookieStore.get('id');
			 var notif = 0;

			FactoryNotifications.getCompteur({userID: currentUser}, function(data){
				if(data != null){
					$scope.numberNotif = data;
					notif = 1;
				} 
			});

 			$scope.isActive = function (viewLocation) { 
 				return viewLocation === $location.path();
 			};
 		}
 	};
 });

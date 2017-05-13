'use strict';

 angular.module('clientApp')
 .directive('navBar', function () {
 	return {
 		templateUrl: 'views/directives/header.html',
 		restrict: 'E',
 		controller: function($scope, $location, $cookieStore, FactoryNotifications) {

 			var currentUser = $cookieStore.get('id');
			FactoryNotifications.getCompteur({userID: currentUser}, function(data){
				$scope.eventsNotified = data;
			});

 			$scope.isActive = function (viewLocation) { 
 				return viewLocation === $location.path();
 			};
 		}
 	};
 });

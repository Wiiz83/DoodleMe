'use strict';

 angular.module('clientApp')
 .directive('navBar', function () {
 	return {
 		templateUrl: 'views/directives/header.html',
 		restrict: 'E',
 		controller: function($scope, $location) {
 			$scope.isActive = function (viewLocation) { 
 				return viewLocation === $location.path();
 			};
 		}
 	};
 });
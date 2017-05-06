'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', function($scope, $http) {
     $http.get('http://localhost:3000/api/users').
        then(function(response) {
            $scope.users = response.data;
        });
});

'use strict';

 angular.module('clientApp')
 .controller('RegisterCtrl', function ($scope, userService) {

 	$scope.createUser = function(){

        var objToSave = new userService();
        objToSave.firstName = $scope.firstName;
        objToSave.lastName = $scope.lastName;
        objToSave.pseudo = $scope.pseudo;
        objToSave.password = $scope.password;

        objToSave.$save(function(savedObj) {
          $scope.resultat = savedObj;
        }, function(error) {
          $scope.resultat = error.data.error;
        });
    };
});

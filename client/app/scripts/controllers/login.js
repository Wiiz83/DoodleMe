'use strict';

 angular.module('clientApp')
 .controller('LoginCtrl', function ($scope, userLogin) {

 	$scope.connectUser = function(){
        var objToSave = new userLogin();
        objToSave.pseudo = $scope.pseudo;
        objToSave.password = $scope.password;

        objToSave.$save(function(savedObj) {
          $scope.resultat = savedObj;
        }, function(error) {
          $scope.resultat = error.data.error;
        });
     };
});



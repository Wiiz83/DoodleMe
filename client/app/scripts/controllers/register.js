'use strict';

 angular.module('clientApp')
 .controller('RegisterCtrl', function ($scope, userRegister, $window) {

 	$scope.createUser = function(){

    var objToSave = new userRegister();
    objToSave.firstName = $scope.firstName;
    objToSave.lastName = $scope.lastName;
    objToSave.pseudo = $scope.pseudo;
    objToSave.password = $scope.password;

    objToSave.$save(function(response) {
      $window.location.href = '/login.html?ready';
    }, function(response) {
      $scope.errorMessage = response.data.description;
    });
};
});

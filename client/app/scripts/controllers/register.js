'use strict';

 angular.module('clientApp')
 .controller('RegisterCtrl', function ($scope, FactoryRegister, $rootScope, $location, $window) {

  $scope.changeView = function(view){
      $location.path(view); 
  }

 	$scope.createUser = function(){

    var objToSave = new FactoryRegister();
    objToSave.firstName = $scope.firstName;
    objToSave.lastName = $scope.lastName;
    objToSave.pseudo = $scope.pseudo;
    objToSave.password = $scope.password;

    objToSave.$save(function(response) {
     // $window.location.href = '/login.html?ready';
       $location.path('').search({ready: 'yes'});
    }, function(response) {
      $scope.errorMessage = response.data.description;
    });
};
});

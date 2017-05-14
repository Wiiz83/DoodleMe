'use strict';

 angular.module('clientApp')
 .controller('RegisterCtrl', function ($scope, FactoryRegister, $rootScope, $location, $window, dataService) {

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
       //$location.path('').search({ready: 'yes'});
       dataService.setData("registerSuccess");
       $location.path(''); 
    }, function(response) {
      $scope.errorMessage = response.data.description;
    });
};
});

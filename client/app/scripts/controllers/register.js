'use strict';

 angular.module('clientApp')
 .controller('RegisterCtrl', function ($scope, userRegister) {

 	$scope.createUser = function(){

    var objToSave = new userRegister();
    objToSave.firstName = $scope.firstName;
    objToSave.lastName = $scope.lastName;
    objToSave.pseudo = $scope.pseudo;
    objToSave.password = $scope.password;

    objToSave.$save(function(data) {
      var status = data.status;
      console.log(status);
    }, function(response) {
      console.log("Statut" + response.data.status);
      console.log("Description" + response.data.description);
      $scope.resultat = response.data.description;
    });
};
});

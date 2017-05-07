'use strict';

 angular.module('clientApp')
 .controller('LoginCtrl', function ($scope, $window, $location, userLogin) {

  var readyToLogin = $location.search();

  if (readyToLogin !== undefined){
     $scope.successMessage = "Inscription réussi, vous pouvez vous connecter.";
  } 

 	$scope.connectUser = function(){
        var objToSave = new userLogin();
        objToSave.pseudo = $scope.pseudo;
        objToSave.password = $scope.password;

        objToSave.$save(function(response) {
          $window.location.href = '/accueil.html';
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };
});





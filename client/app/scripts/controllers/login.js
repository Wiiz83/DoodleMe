'use strict';

 angular.module('clientApp')
 .controller('LoginCtrl', function ($scope, $window, $rootScope, $location, $routeParams, FactoryLogin) {

 // var readyToLogin = $location.search();
  var readyToLogin = $routeParams.ready;
  if (readyToLogin === "yes"){
     $scope.successMessage = "Inscription réussi, vous pouvez vous connecter.";
  } 

  $scope.changeView = function(view){
      $location.path(view); 
  }


 	$scope.connectUser = function(){
        var objToSave = new FactoryLogin();
        objToSave.pseudo = $scope.pseudo;
        objToSave.password = $scope.password;

        objToSave.$save(function(response) {
           $location.path('accueil');
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };
});




